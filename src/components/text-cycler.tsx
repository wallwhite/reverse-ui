import { useState, useId, useLayoutEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface TextCyclerProps {
  texts: string[];
  interval?: number;
  duration?: number;
  letterDelay?: number;
  blurStrength?: number;
  autoplay?: boolean;
}

const TextCycler = ({
  texts,
  interval = 4000,
  duration = 400,
  letterDelay = 0.025,
  blurStrength = 10,
  autoplay = true,
}: TextCyclerProps) => {
  const [currentText, setCurrentText] = useState(texts[0]);
  const [iteration, setIteration] = useState(0);
  const uniqueId = useId();
  const [isTabVisible, setIsTabVisible] = useState(true);

  useLayoutEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    setIsTabVisible(document.visibilityState === 'visible');

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useLayoutEffect(() => {
    if (!autoplay || !isTabVisible) {
      return;
    }

    const rotationTimer = setInterval(() => {
      setCurrentText((prevText) => {
        const NOT_FOUND_INDEX = -1;
        const currentIndex = texts.indexOf(prevText);

        if (currentIndex === NOT_FOUND_INDEX) {
          return texts[0];
        }

        const nextIndex = (currentIndex + 1) % texts.length;

        return texts[nextIndex];
      });

      setIteration((prev) => prev + 1);
    }, interval);

    return () => {
      clearInterval(rotationTimer);
    };
  }, [isTabVisible, currentText, interval, texts, autoplay]);

  const DURATION_DIVISOR = 1000;

  return (
    <>
      <AnimatePresence mode="popLayout" initial={false}>
        {[...currentText].map((letter, index) => (
          <motion.span
            key={uniqueId + index + iteration}
            initial={{
              opacity: 0,
              filter: `blur(${blurStrength}px)`,
            }}
            style={{
              display: 'inline-block',
            }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
              transition: {
                delay: index * letterDelay,
                duration: duration / DURATION_DIVISOR,
              },
              transitionEnd: {
                filter: 'none',
              },
            }}
            exit={{
              opacity: 0,
              filter: `blur(${blurStrength}px)`,
              transition: {
                delay: index * letterDelay,
                duration: duration / DURATION_DIVISOR,
              },
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </AnimatePresence>
    </>
  );
};

export { TextCycler };
