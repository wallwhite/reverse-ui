import { Box } from '@mui/system';
import { useState, useRef, useEffect, ReactNode, forwardRef } from 'react';

interface SpeedyCirclesProps {
  children?: ReactNode;
}

const SpeedyCircles = ({ children }: SpeedyCirclesProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const animationsRef = useRef<Animation[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const normalSpeed = 1;
  const fastSpeed = 30;
  const fastAdjustment = 0.4;
  const slowAdjustment = 0.7;

  const adjustPlaybackRate = (targetRate: number, adjustmentSpeed: number) => {
    let currentRate =
      animationsRef.current.length > 0
        ? animationsRef.current[0].playbackRate
        : normalSpeed;

    const animate = () => {
      if (Math.abs(currentRate - targetRate) <= adjustmentSpeed) {
        animationsRef.current.forEach((animation) => {
          animation.playbackRate = targetRate;
        });
        return;
      }

      if (currentRate < targetRate) {
        currentRate += adjustmentSpeed;
      } else {
        currentRate -= adjustmentSpeed;
      }

      animationsRef.current.forEach((animation) => {
        animation.playbackRate = currentRate;
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    adjustPlaybackRate(fastSpeed, fastAdjustment);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    adjustPlaybackRate(normalSpeed, slowAdjustment);
  };

  useEffect(() => {
    const animations: Animation[] = [];
    const circles = document.querySelectorAll('.animation-circle');

    circles.forEach((circle, index) => {
      const keyframes =
        index % 2 === 0
          ? [{ transform: 'rotate(0turn)' }, { transform: 'rotate(-1turn)' }]
          : [{ transform: 'rotate(0turn)' }, { transform: 'rotate(1turn)' }];

      const animation = circle.animate(keyframes, {
        duration: (6 + 0.5 * index) * 1000,
        iterations: Infinity,
        easing: 'linear'
      });

      animations.push(animation);
    });

    animationsRef.current = animations;

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%'
        }}
      >
        <CircleAnimation
          width={120}
          height={120}
          index={0}
          isHovered={isHovered}
          ref={(el) => {
            if (el && !circleRefs.current.includes(el)) {
              circleRefs.current[0] = el;
            }
          }}
        />
        <CircleAnimation
          width={240}
          height={240}
          index={1}
          isHovered={isHovered}
          ref={(el) => {
            if (el && !circleRefs.current.includes(el)) {
              circleRefs.current[1] = el;
            }
          }}
        />
        <CircleAnimation
          width={380}
          height={380}
          index={2}
          isHovered={isHovered}
          ref={(el) => {
            if (el && !circleRefs.current.includes(el)) {
              circleRefs.current[2] = el;
            }
          }}
        />
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

interface CircleAnimationProps {
  width: number;
  height: number;
  index: number;
  isHovered: boolean;
}

const CircleAnimation = forwardRef<HTMLDivElement, CircleAnimationProps>(
  ({ width, height, index, isHovered }, ref) => {
    return (
      <Box
        ref={ref}
        className="animation-circle"
        sx={{
          width,
          height,
          top: `calc(50% - ${height / 2}px)`,
          left: `calc(50% - ${width / 2}px)`,
          position: 'absolute',
          borderRadius: '50%',
          background: 'rgba(255,255,255,.005)',
          boxShadow: 'inset 0 -16px 32px #ffffff0a',
          transition: 'transform cubic-bezier(.6,.6,0,1)',
          transitionDuration: 0.35 + index * 0.1 + 's',
          '&:before': {
            content: '""',
            left: 0,
            top: 0,
            position: 'absolute',
            width: 'calc(100% - 2px)',
            height: 'calc(100% - 2px)',
            border: '1px solid rgba(255, 255, 255, .05)',
            borderRadius: 'inherit'
          },
          '&:after': {
            content: '""',
            background:
              'conic-gradient(from 360deg at 50% 50%, #FFF 0deg, rgba(255, 255, 255, 1) 45deg, rgba(255, 255, 255, 0) 133deg)',
            borderRadius: 'inherit',
            position: 'absolute',
            inset: 0,
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            ...(index % 2 === 1 && {
              background:
                'conic-gradient(from 360deg at 50% 50%, rgba(255, 255, 255, 0) 0deg, rgba(255, 255, 255, 0) 280deg, rgba(255, 255, 255, 1) 324deg)'
            })
          },
          ...(isHovered && {
            transform: 'scale(1.1)'
          })
        }}
      />
    );
  }
);

CircleAnimation.displayName = 'CircleAnimation';

export { SpeedyCircles };
