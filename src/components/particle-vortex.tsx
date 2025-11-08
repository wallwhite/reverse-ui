import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { useAnimationFrame } from 'framer-motion';

interface ParticleVortexProps {
  centerSize?: number;
  particleCount?: number;
  discCount?: number;
  lineCount?: number;
  particleSpeed?: number;
  discSpeed?: number;
  color?: string;
}

interface Dimensions {
  width: number;
  height: number;
}

interface RenderState {
  width: number;
  height: number;
  dpi: number;
}

interface Disc {
  p: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

interface DiscPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Particle {
  lineIndex: number;
  p: number;
  v: number;
  l: number;
  a: number;
}

interface Line {
  p0: { x: number; y: number };
  p1: { x: number; y: number };
  l: { x: number; y: number };
}

type EaseName = 'linear' | 'inExpo' | 'outCubic';

const easeInExpo = (x: number): number => {
  return x === 0 ? 0 : 2 ** (10 * x - 10);
};

const easeOutCubic = (x: number): number => {
  return 1 - (1 - x) ** 3;
};

const linear = (x: number): number => {
  return x;
};

const tweenValue = (start: number, end: number, p: number, ease: EaseName = 'linear'): number => {
  const delta = end - start;
  const easeFn: Record<EaseName, (x: number) => number> = {
    linear,
    inExpo: easeInExpo,
    outCubic: easeOutCubic,
  };

  return start + delta * easeFn[ease](p);
};

const ParticleVortex: React.FC<ParticleVortexProps> = ({
  centerSize = 128,
  particleCount = 500,
  discCount = 20,
  lineCount = 100,
  particleSpeed = 0.005,
  discSpeed = 0.001,
  color = '#222',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [render, setRender] = useState<RenderState>({ width: 0, height: 0, dpi: 1 });
  const [discs, setDiscs] = useState<Disc[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [startDisc, setStartDisc] = useState<DiscPosition>({ x: 0, y: 0, w: 0, h: 0 });
  const [endDisc, setEndDisc] = useState<DiscPosition>({ x: 0, y: 0, w: 0, h: 0 });

  const initParticle = (forced = false): Particle => {
    return {
      lineIndex: Math.round((lineCount - 1) * Math.random()),
      p: forced ? Math.random() : 0,
      v: particleSpeed + Math.random() * particleSpeed,
      l: 0.01 + Math.random() * 0.1,
      a: 0.05 + Math.random() * 0.15,
    };
  };

  const setSize = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    setDimensions({
      width: rect.width,
      height: rect.height,
    });

    const dpi = window.devicePixelRatio;

    setRender({
      width: rect.width * dpi,
      height: rect.height * dpi,
      dpi,
    });

    const diag = Math.hypot(rect.width, rect.height);

    setStartDisc({
      x: rect.width * 0.5,
      y: rect.height * 0.5,
      w: diag * 0.5,
      h: diag * 0.5,
    });

    setEndDisc({
      x: rect.width * 0.5,
      y: rect.height * 0.5,
      w: centerSize * 0.5,
      h: centerSize * 0.5,
    });
  };

  const tweenDisc = (disc: Disc): Disc => {
    return {
      ...disc,
      x: tweenValue(startDisc.x, endDisc.x, disc.p),
      y: tweenValue(startDisc.y, endDisc.y, disc.p, 'inExpo'),
      w: tweenValue(startDisc.w, endDisc.w, disc.p, 'outCubic'),
      h: tweenValue(startDisc.h, endDisc.h, disc.p, 'outCubic'),
    };
  };

  const initializeAnimation = () => {
    const newDiscs = Array.from({ length: discCount }, (_, i) => ({
      p: i / discCount,
    })).map((disc) => tweenDisc(disc));

    setDiscs(newDiscs);

    const newParticles = Array.from({ length: particleCount }, () => initParticle(true));

    setParticles(newParticles);
  };

  const updateLines = (time = performance.now()) => {
    const linesAngle = (Math.PI * 2) / lineCount;

    const newLines = Array.from({ length: lineCount }, (_, i) => {
      const angle = (i * linesAngle + time * 0.0001) % (Math.PI * 2);

      const p0 = {
        x: dimensions.width * 0.5 + Math.cos(angle) * startDisc.w,
        y: dimensions.height * 0.5 + Math.sin(angle) * startDisc.h,
      };

      const p1 = {
        x: dimensions.width * 0.5 + Math.cos(angle) * endDisc.w,
        y: dimensions.height * 0.5 + Math.sin(angle) * endDisc.h,
      };

      return {
        p0,
        p1,
        l: {
          x: p1.x - p0.x,
          y: p1.y - p0.y,
        },
      };
    });

    setLines(newLines);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;

    ctx.clearRect(0, 0, render.width, render.height);
    ctx.save();
    ctx.scale(render.dpi, render.dpi);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(startDisc.x, startDisc.y, startDisc.w, startDisc.h, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    discs.forEach((disc) => {
      if (disc.x === undefined || disc.y === undefined || disc.w === undefined || disc.h === undefined) {
        return;
      }

      ctx.beginPath();
      ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    });

    ctx.beginPath();
    lines.forEach(({ p0, p1 }) => {
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    particles.forEach((particle) => {
      const line = lines[particle.lineIndex];

      if (!line) return;

      const start = {
        x: line.p0.x + line.l.x * particle.p,
        y: line.p0.y + line.l.y * particle.p,
      };

      const p1 = {
        x: start.x + line.l.x * particle.l,
        y: start.y + line.l.y * particle.l,
      };

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${particle.a})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    });

    ctx.restore();
  };

  useEffect(() => {
    const handleResize = () => {
      setSize();
    };

    setSize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height && !isInitializedRef.current) {
      initializeAnimation();
    }
  }, [dimensions]);

  useAnimationFrame((time) => {
    const ctx = canvasRef.current?.getContext('2d');

    if (!ctx) return;

    setDiscs((prevDiscs) =>
      prevDiscs
        .map((disc) => ({
          ...disc,
          p: (disc.p + discSpeed) % 1,
        }))
        .map((disc) => tweenDisc(disc)),
    );

    setParticles((prevParticles) =>
      prevParticles.map((particle) => ({
        ...particle,
        p: particle.p < 1 ? particle.p + particle.v : 0,
      })),
    );

    updateLines(time);
    draw(ctx);
  });

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: '-25%',
          left: '-25%',
          width: '150%',
          height: '150%',
          zIndex: 2,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 10%, #161616 45%)',
        },
      }}
      ref={containerRef}
    >
      <canvas
        ref={canvasRef}
        width={render.width}
        height={render.height}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </Box>
  );
};

export { ParticleVortex };
