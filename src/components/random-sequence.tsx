import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const sequenceGenerator = (length: number): string => {
  let result = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const updateRefText = (ref: HTMLDivElement | null, text: string): void => {
  if (!ref) return;
  const child = ref.firstChild;
  child && !child.nextSibling && child.nodeType === Node.TEXT_NODE
    ? ((child as Text).data = text)
    : (ref.textContent = text);
};

const RandomSequence = () => {
  const sequence = sequenceGenerator(1200);
  const firstDivRef = useRef<HTMLDivElement>(null);
  const secondDivRef = useRef<HTMLDivElement>(null);
  const firstSequenceRef = useRef(sequence.slice(0, 600));
  const secondSequenceRef = useRef(sequence.slice(600));

  const style = {
    backgroundClip: 'text',
    backgroundImage:
      'linear-gradient(to right, rgba(255, 255, 255, 0.1) calc(50% - 32px), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.1) calc(50% + 32px))',
    backgroundSize: 'calc(200% + 64px) 100%'
  };

  const animation = {
    initial: {
      backgroundPosition: 'calc(-100% - 64px) 0%'
    },
    animate: {
      backgroundPosition: 'calc(-200% - 64px) 0%',
      transition: {
        delay: 0.5,
        duration: 3,
        ease: 'linear',
        repeat: Infinity
      }
    },
    exit: {
      opacity: 0
    }
  };

  useEffect(() => {
    let timer = 0;
    const callback = (): void => {
      const now = window.performance.now();
      if (now < timer) {
        raf = window.requestAnimationFrame(callback);
        return;
      }
      timer = now + 200;
      const firstStartIndex = 1200 * Math.random();
      const secondStartIndex = 1200 * Math.random();
      firstSequenceRef.current =
        sequence.slice(firstStartIndex, firstStartIndex + 600) +
        sequence.slice(0, Math.max(0, firstStartIndex - 600));
      secondSequenceRef.current =
        sequence.slice(secondStartIndex, secondStartIndex + 600) +
        sequence.slice(0, Math.max(0, secondStartIndex - 600));
      updateRefText(firstDivRef.current, firstSequenceRef.current);
      updateRefText(secondDivRef.current, secondSequenceRef.current);
      raf = window.requestAnimationFrame(callback);
    };
    let raf = window.requestAnimationFrame(callback);
    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [sequence]);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: 300,
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: 380
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              letterSpacing: '0.1em',
              fontSize: 10,
              lineHeight: '14px',
              textAlign: 'center',
              wordBreak: 'break-all',
              color: 'rgba(255, 255, 255, 0.12)'
            }}
          >
            <Box
              sx={{
                backgroundImage:
                  'radial-gradient(172px 152px, rgba(255, 255, 255, 0), rgb(22 22 22))',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 600,
                height: 800,
                ml: '-300px',
                mt: '-400px',
                zIndex: 10
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                overflow: 'hidden',
                left: 0,
                bottom: 0,
                width: '100%'
              }}
            >
              <Box
                ref={firstDivRef}
                component={motion.div}
                sx={{
                  mb: '-14px',
                  ...style
                }}
                {...animation}
              >
                {firstSequenceRef.current}
              </Box>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                overflow: 'hidden',
                left: 0,
                top: '100%',
                width: '100%'
              }}
            >
              <Box
                ref={secondDivRef}
                component={motion.div}
                sx={{
                  mb: '-14px',
                  ...style
                }}
                {...animation}
              >
                {secondSequenceRef.current}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: 80,
              background:
                'radial-gradient(120.05% 100% at 50% 0%,rgba(255, 255, 255, 0) 33.78%,rgb(22 22 22) 100%),rgba(255, 255, 255, .005)',
              zIndex: 12
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export { RandomSequence };
