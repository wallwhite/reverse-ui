import { useState, useRef, useEffect, useMemo } from 'react';
import { Box } from '@mui/system';

const ANIMATION_CONSTANTS = {
  SPRING_STIFFNESS: 200,
  SPRING_DAMPING: 10,
  MAX_DELTA_TIME: 0.016,
};

const SHINE_GRADIENT_COLORS = [
  'hsl(358, 100%, 62%)',
  'hsl(30, 100%, 50%)',
  'hsl(60, 100%, 50%)',
  'hsl(96, 100%, 50%)',
  'hsl(233, 85%, 47%)',
  'hsl(271, 85%, 47%)',
  'hsl(300, 20%, 35%)',
  'transparent',
  'transparent',
  'white',
];

interface TransformMatrix {
  scaleX: number;
  shearY1: number;
  rotationY: number;
  perspective1: number;
  rotationCompoundXY: number;
  scaleY: number;
  rotationCompound: number;
  perspective2: number;
  rotationX: number;
  rotationZ: number;
  scaleZ: number;
  perspective3: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  perspectiveFactor: number;
}

interface RotationAngles {
  x: number;
  y: number;
}

const calculateTransformMatrix = (rotationAngles: RotationAngles): TransformMatrix => {
  const { x, y } = rotationAngles;

  return {
    scaleX: Math.cos((y * Math.PI) / 180),
    shearY1: 0,
    rotationY: Math.sin((y * Math.PI) / 180),
    perspective1: 0,
    rotationCompoundXY: Math.sin((x * Math.PI) / 180) * Math.sin((y * Math.PI) / 180),
    scaleY: Math.cos((x * Math.PI) / 180),
    rotationCompound: -Math.sin((x * Math.PI) / 180) * Math.cos((y * Math.PI) / 180),
    perspective2: 0,
    rotationX: -Math.sin((y * Math.PI) / 180),
    rotationZ: Math.sin((x * Math.PI) / 180),
    scaleZ: Math.cos((x * Math.PI) / 180) * Math.cos((y * Math.PI) / 180),
    perspective3: 0,
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    perspectiveFactor: 1,
  };
};

interface WreathIconProps {
  color: string;
}

const WreathIcon = ({ color }: WreathIconProps) => {
  return (
    <g transform="translate(8, 9)">
      <path
        fill={color}
        d="M14.963 9.075c.787-3-.188-5.887-.188-5.887S12.488 5.175 11.7 8.175c-.787 3 .188 5.887.188 5.887s2.25-1.987 3.075-4.987m-4.5 1.987c.787 3-.188 5.888-.188 5.888S7.988 14.962 7.2 11.962c-.787-3 .188-5.887.188-5.887s2.287 1.987 3.075 4.987m.862 10.388s-.6-2.962-2.775-5.175C6.337 14.1 3.375 13.5 3.375 13.5s.6 2.962 2.775 5.175c2.213 2.175 5.175 2.775 5.175 2.775m3.3 3.413s-1.988-2.288-4.988-3.075-5.887.187-5.887.187 1.987 2.287 4.988 3.075c3 .787 5.887-.188 5.887-.188Zm6.75 0s1.988-2.288 4.988-3.075c3-.826 5.887.187 5.887.187s-1.988 2.287-4.988 3.075c-3 .787-5.887-.188-5.887-.188ZM32.625 13.5s-2.963.6-5.175 2.775c-2.213 2.213-2.775 5.175-2.775 5.175s2.962-.6 5.175-2.775c2.175-2.213 2.775-5.175 2.775-5.175M28.65 6.075s.975 2.887.188 5.887c-.826 3-3.076 4.988-3.076 4.988s-.974-2.888-.187-5.888c.788-3 3.075-4.987 3.075-4.987m-4.5 7.987s.975-2.887.188-5.887c-.788-3-3.076-4.988-3.076-4.988s-.974 2.888-.187 5.888c.788 3 3.075 4.988 3.075 4.988ZM18 26.1c.975-.225 3.113-.6 5.325 0 3 .788 5.063 3.038 5.063 3.038s-2.888.975-5.888.187a13 13 0 0 1-1.425-.525c.563.788 1.125 1.425 2.288 1.913l-.863 2.062c-2.063-.862-2.925-2.137-3.675-3.262-.262-.375-.525-.713-.787-1.05-.26.293-.465.586-.686.903l-.102.147-.048.068c-.775 1.108-1.643 2.35-3.627 3.194l-.862-2.062c1.162-.488 1.725-1.125 2.287-1.913-.45.225-.938.375-1.425.525-3 .788-5.887-.187-5.887-.187s1.987-2.288 4.987-3.075c2.212-.563 4.35-.188 5.325.037"
      />
    </g>
  );
};

interface ShineEffectProps {
  width: number;
  height: number;
  shineAngle: number;
}

const ShineEffect = ({ width, height, shineAngle }: ShineEffectProps) => {
  return (
    <g
      style={{
        mixBlendMode: 'overlay',
      }}
      mask="url(#badgeMask)"
    >
      {SHINE_GRADIENT_COLORS.map((color, index) => (
        <g
          key={index}
          style={{
            transform: `rotate(${3.2 * shineAngle + 10 * index - 20}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <polygon
            points={`0,0 ${width},${height} ${width},0 0,${height}`}
            fill={color}
            filter="url(#blur1)"
            opacity="0.5"
          />
        </g>
      ))}
    </g>
  );
};

interface Velocity {
  x: number;
  y: number;
}

const useSpringAnimation = (targetPosition: RotationAngles, isActive: boolean): RotationAngles => {
  const velocity = useRef<Velocity>({
    x: 0,
    y: 0,
  });

  const [currentPosition, setCurrentPosition] = useState<RotationAngles>({
    x: 0,
    y: 0,
  });

  const animationFrameId = useRef<number | null>(null);
  const lastFrameTime = useRef(performance.now());

  useEffect(() => {
    const animate = (): void => {
      const currentTime = performance.now();
      const deltaTime = Math.min((currentTime - lastFrameTime.current) / 1000, ANIMATION_CONSTANTS.MAX_DELTA_TIME);

      lastFrameTime.current = currentTime;

      const effectiveTarget = isActive
        ? targetPosition
        : {
            x: Math.sin((currentTime / 4000) * Math.PI),
            y: Math.sin((currentTime / 2000) * Math.PI),
          };

      const forceX = (effectiveTarget.x - currentPosition.x) * ANIMATION_CONSTANTS.SPRING_STIFFNESS;
      const forceY = (effectiveTarget.y - currentPosition.y) * ANIMATION_CONSTANTS.SPRING_STIFFNESS;

      const dampingX = -velocity.current.x * ANIMATION_CONSTANTS.SPRING_DAMPING;
      const dampingY = -velocity.current.y * ANIMATION_CONSTANTS.SPRING_DAMPING;

      velocity.current = {
        x: velocity.current.x + (forceX + dampingX) * deltaTime,
        y: velocity.current.y + (forceY + dampingY) * deltaTime,
      };

      setCurrentPosition((prev) => ({
        x: prev.x + velocity.current.x * deltaTime,
        y: prev.y + velocity.current.y * deltaTime,
      }));

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [targetPosition, currentPosition, isActive]);

  return currentPosition;
};

interface AwardBadgeProps {
  url?: string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  maxRotation?: number;
  title?: string;
  subtitle?: string;
}

const AwardBadge = ({
  url,
  bgColor = '#ffea2e',
  borderColor = '#d6c100',
  textColor = '#946500',
  maxRotation = 15,
  title = '',
  subtitle = '',
}: AwardBadgeProps) => {
  const svgWidth = 260;
  const svgHeight = 54;

  const [isHovered, setIsHovered] = useState(false);
  const [targetRotation, setTargetRotation] = useState<RotationAngles>({
    x: 0,
    y: 0,
  });

  const currentRotation = useSpringAnimation(targetRotation, isHovered);

  const transformMatrix = useMemo(() => calculateTransformMatrix(currentRotation), [currentRotation]);

  const shineAngle = useMemo(
    () => 2 * Math.hypot(currentRotation.x, currentRotation.y),
    [currentRotation.x, currentRotation.y],
  );

  const handleMouseMove = useMemo(
    () => (event: React.MouseEvent<HTMLElement>) => {
      if (!isHovered) return;

      const rect = event.currentTarget.getBoundingClientRect();

      setTargetRotation({
        x: ((event.clientY - rect.top) / rect.height - 0.5) * 2 * maxRotation,
        y: -(2 * ((event.clientX - rect.left) / rect.width - 0.5)) * maxRotation,
      });
    },
    [isHovered, maxRotation],
  );

  const handleMouseLeave = useMemo(
    () => () => {
      setIsHovered(false);
      setTargetRotation({
        x: 0,
        y: 0,
      });
    },
    [],
  );

  return (
    <Box
      component={url ? 'a' : 'div'}
      href={url ? url : undefined}
      target="_blank"
      rel="noopener"
      sx={{
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          pointerEvents: 'none',
          userSelect: 'none',
          transform: `perspective(500px) matrix3d(${Object.values(transformMatrix).join(',')})`,
          transformOrigin: 'center center',
        }}
      >
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          sx={{
            width: 260,
            height: 'auto',
          }}
        >
          <defs>
            <filter id="blur1">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <mask id="badgeMask">
              <rect width={svgWidth} height={svgHeight} fill="white" rx="10" />
            </mask>
          </defs>
          <rect width={svgWidth} height={svgHeight} rx="10" fill={bgColor} />
          <rect
            x="4"
            y="4"
            width={svgWidth - 8}
            height={svgHeight - 8}
            rx="8"
            fill="transparent"
            stroke={borderColor}
            strokeWidth="1"
          />
          <text fontFamily="Helvetica-Bold, Helvetica" fontSize="9" fontWeight="bold" fill={textColor} x="53" y="20">
            {title}
          </text>
          <text fontFamily="Helvetica-Bold, Helvetica" fontSize="16" fontWeight="bold" fill={textColor} x="52" y="40">
            {subtitle}
          </text>
          <WreathIcon color={textColor} />
          <ShineEffect width={svgWidth} height={svgHeight} shineAngle={shineAngle} />
        </Box>
      </Box>
    </Box>
  );
};

export { AwardBadge };
