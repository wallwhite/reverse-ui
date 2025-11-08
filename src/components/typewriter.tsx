import { useEffect } from 'react';
import { Box, keyframes } from '@mui/system';
import { animate, motion, useMotionValue, useTransform, type EasingDefinition } from 'framer-motion';

const blinkKeyframe = keyframes`
  0% {
      opacity: 0;
  }

  50% {
      opacity: 1;
  }

  100% {
      opacity: 0;
  }
`;

const TypingCursor = () => {
  return (
    <Box
      sx={{
        width: '2px',
        height: 16,
        display: 'inline-block',
        ml: '3px',
        mb: '-2px',
        background: '#c2e6ebd4',
        animation: `${blinkKeyframe} 1.5s infinite`,
      }}
    />
  );
};

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  showCursor?: boolean;
  ease?: EasingDefinition;
  onComplete?: () => void;
}

const Typewriter = ({
  text,
  speed = 30,
  delay = 0,
  showCursor = false,
  ease = 'easeInOut',
  onComplete,
}: TypewriterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayedText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const DELAY_DIVISOR = 1000;
    const DURATION_DIVISOR = 1000;
    const controls = animate(count, text.length, {
      delay: delay / DELAY_DIVISOR,
      duration: (speed * text.length) / DURATION_DIVISOR,
      ease,
      onComplete: () => {
        onComplete?.();
      },
    });

    return controls.stop;
  }, [text, speed, delay, count, onComplete, ease]);

  return (
    <>
      <Box component={motion.span}>{displayedText}</Box>
      {showCursor && <TypingCursor />}
    </>
  );
};

export { Typewriter };
