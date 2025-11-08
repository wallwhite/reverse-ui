import { Box, SxProps } from '@mui/system';
import { animate, motion, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface XRayProps {
  children: React.ReactNode;
}

const XRay: React.FC<XRayProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseStartY = useRef(0);
  const [scannerOpacity, setScannerOpacity] = useState(0);
  const animationRef = useRef<any>(null);

  const initialScannerPosition = 174;
  const scanLineOffset = 2;

  const y = useSpring(0, {
    damping: 32,
    stiffness: 500,
    mass: 0.8,
  });

  const clipPath = useTransform(y, (latest) => `inset(${latest}px 0 0 0)`);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    const startAnimation = async () => {
      if (!containerRef.current) return;

      y.set(containerRef.current.clientHeight);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setScannerOpacity(1);

      animationRef.current = animate(y, initialScannerPosition, {
        type: 'spring',
        stiffness: 350,
        damping: 50,
        mass: 0.3,
      });
    };

    startAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [y]);

  const constrainValue = (value: number, [min, max]: [number, number], multiplier = 2): number => {
    if (value > max) {
      const diff = value - max;
      return max + (diff > 0 ? Math.sqrt(diff) : -Math.sqrt(-diff)) * multiplier;
    }

    if (value < min) {
      const diff = value - min;
      return min + (diff > 0 ? Math.sqrt(diff) : -Math.sqrt(-diff)) * multiplier;
    }

    return value;
  };

  const handleMouseEnter = () => {
    const { y: rectY } = containerRef.current!.getBoundingClientRect();
    mouseStartY.current = rectY;
  };

  const handleMouseLeave = () => {
    animate(y, initialScannerPosition, {
      type: 'spring',
      stiffness: 350,
      damping: 50,
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    let offset = event.clientY - mouseStartY.current;
    offset = constrainValue(offset, [100, containerRef.current!.offsetHeight - 100], 6);
    y.set(offset);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={containerRef}
      sx={{
        padding: '90px 48px',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Corner position="top-left" />
      <Corner position="top-right" />
      <Corner position="bottom-left" />
      <Corner position="bottom-right" />

      <Box
        sx={{
          color: '#fff',
        }}
      >
        {children}
      </Box>

      <Box
        component={motion.div}
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          background: '#009e86',
          height: '2px',
          width: '100%',
        }}
        style={{
          y: useTransform(y, (v) => v - scanLineOffset),
          opacity: scannerOpacity,
        }}
      />

      <Box
        component={motion.div}
        sx={{
          padding: '48px',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          zIndex: 2,
        }}
        style={{
          clipPath,
          opacity: scannerOpacity,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            inset: 0,
            background: 'linear-gradient(180deg, #006354 0,transparent 100%)',
          }}
        />

        <Box
          sx={{
            color: 'hsl(0 0% 8.5%)',
            textShadow: '-1px -1px 0 #00aa95,1px -1px 0 #00aa95,-1px 1px 0 #00aa95,1px 1px 0 #00aa95',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface CornerProps {
  position: CornerPosition;
}

const Corner: React.FC<CornerProps> = ({ position }) => {
  const baseStyles: SxProps = {
    position: 'absolute',
    width: 15,
    height: 15,
    '&:before': {
      content: '""',
      position: 'absolute',
      background: '#009e86',
      width: 15,
      height: '1px',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      background: '#009e86',
      width: '1px',
      height: 15,
    },
  };

  const positionStyles: Record<CornerPosition, SxProps> = {
    'top-left': {
      top: '-1px',
      left: '-1px',
      '&:before': {
        left: 0,
        top: 0,
      },
      '&:after': {
        left: 0,
        top: 0,
      },
    },
    'top-right': {
      top: '-1px',
      right: '-1px',
      '&:before': {
        right: 0,
        top: 0,
      },
      '&:after': {
        right: 0,
        top: 0,
      },
    },
    'bottom-left': {
      bottom: '-1px',
      left: '-1px',
      '&:before': {
        left: 0,
        bottom: 0,
      },
      '&:after': {
        left: 0,
        bottom: 0,
      },
    },
    'bottom-right': {
      bottom: '-1px',
      right: '-1px',
      '&:before': {
        right: 0,
        bottom: 0,
      },
      '&:after': {
        right: 0,
        bottom: 0,
      },
    },
  };

  return <Box sx={{ ...baseStyles, ...positionStyles[position] }} />;
};

export { XRay };
