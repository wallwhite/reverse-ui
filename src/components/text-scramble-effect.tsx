import { useEffect, useRef, useState } from 'react';

const CHARACTER_SET = [...'0123456789qwertyuiopasdfghjklzxcvbnm!?></\\a~+*=@#$%'];

const getRandomIndex = (): number => {
  return Math.floor(Math.random() * CHARACTER_SET.length);
};

const generateRandomString = (length: number): string => {
  let randomString = '';

  for (let i = 0; i < length; i++) {
    randomString += CHARACTER_SET[getRandomIndex()];
  }

  return randomString;
};

interface TextScrambleEffectProps {
  text?: string;
}

const TextScrambleEffect = ({ text = '' }: TextScrambleEffectProps) => {
  const [displayText, setDisplayText] = useState<[string, string]>([text, '']);
  const [isAnimationDisabled] = useState(false);
  const animationFrameRef = useRef<number>();
  const progressRef = useRef(0);

  // Disable animation for small screens
  // useEffect(() => {
  //     setIsAnimationDisabled(windowWidth <= 1100);
  // }, [windowWidth]);

  useEffect(() => {
    if (isAnimationDisabled) {
      return;
    }

    const INITIAL_THRESHOLD = 36;
    const PROGRESS_INCREMENT = 2;
    const PROGRESS_DIVISOR = 2;
    const PROGRESS_OFFSET = 18;
    const SLICE_OFFSET = 1;

    progressRef.current = 0;
    const textLength = text.length;

    const animateTextReveal = () => {
      if (progressRef.current < INITIAL_THRESHOLD) {
        setDisplayText(['', generateRandomString(textLength)]);
      } else if (progressRef.current / PROGRESS_DIVISOR - PROGRESS_OFFSET < textLength) {
        const revealedPart = text.slice(0, progressRef.current / PROGRESS_DIVISOR - PROGRESS_OFFSET - SLICE_OFFSET);
        const remainingRandomPart = generateRandomString(textLength - revealedPart.length);

        setDisplayText([revealedPart, remainingRandomPart]);
      } else {
        setDisplayText([text, '']);

        return;
      }

      progressRef.current += PROGRESS_INCREMENT;
      animationFrameRef.current = requestAnimationFrame(animateTextReveal);
    };

    animationFrameRef.current = requestAnimationFrame(animateTextReveal);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [text, isAnimationDisabled]);

  useEffect(() => {
    if (isAnimationDisabled) {
      setDisplayText(() => ['', generateRandomString(text.length)]);
    }
  }, [text, isAnimationDisabled]);

  useEffect(() => {
    if (isAnimationDisabled) {
      setDisplayText(() => [text, '']);
    }
  }, [isAnimationDisabled, text]);

  return (
    <div>
      <span>{displayText[0]}</span>
      <span>{displayText[1]}</span>
    </div>
  );
};

export { TextScrambleEffect };
