import { Box } from '@mui/system';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  duration?: number;
  delay?: number;
}

const ShinyText = ({ text, duration = 2, delay = 0 }: ShinyTextProps) => {
  const width = text.length * 2;

  return (
    <Box
      component={motion.p}
      initial={{
        backgroundPosition: '100% center'
      }}
      animate={{
        backgroundPosition: '0% center'
      }}
      transition={{
        repeat: Infinity,
        duration,
        repeatDelay: delay,
        ease: 'linear'
      }}
      sx={{
        position: 'relative',
        display: 'inline-block',
        backgroundSize: '250% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        backgroundImage: `
          linear-gradient(
            90deg,
            transparent calc(50% - ${width}px),
            #ffffff 50%,
            transparent calc(50% + ${width}px)
          ),
          linear-gradient(#b5b5b5a4,#b5b5b5a4)
        `
      }}
    >
      {text}
    </Box>
  );
};

export { ShinyText };
