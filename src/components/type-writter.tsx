import { useState, useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { Box } from '@mui/system';

const defaultPace = (lastChar: string, nextChar: string): number => {
  switch (lastChar) {
    case '—':
    case '…':
      return 200;
    case '.':
    case ',':
      return 150;
    case '?':
    case '!':
      if (nextChar !== '!' && nextChar !== '?') return 150;
      return 20;
    case '-':
    case ' ':
    case '\n':
      return 0;
    default:
      return 20;
  }
};

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const TypeWritter = ({ text, speed = 30, delay = 0, onComplete }: TypewriterProps) => {
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayedText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      delay: delay / 1000,
      duration: (speed * text.length) / 1000,
      ease: 'easeInOut',
      onComplete: () => {
        setDone(true);
        onComplete?.();
      }
    });

    return controls.stop;
  }, [text, speed, delay, count, onComplete]);

  return <Box component={motion.span}>{displayedText}</Box>;
};

