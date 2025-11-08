import { useEffect } from 'react';
import { Box } from '@mui/system';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

const DELAY_DIVISOR = 1000;
const DURATION_DIVISOR = 1000;

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const TypeWritter = ({ text, speed = 30, delay = 0, onComplete }: TypewriterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayedText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      delay: delay / DELAY_DIVISOR,
      duration: (speed * text.length) / DURATION_DIVISOR,
      ease: 'easeInOut',
      onComplete: () => {
        onComplete?.();
      },
    });

    return controls.stop;
  }, [text, speed, delay, count, onComplete]);

  return <Box component={motion.span}>{displayedText}</Box>;
};
