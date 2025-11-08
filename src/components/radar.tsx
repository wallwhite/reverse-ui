import { Box } from '@mui/system';
import { motion } from 'framer-motion';

interface RadialCircleProps {
  index: number;
}

const RadialCircle: React.FC<RadialCircleProps> = ({ index }) => {
  return (
    <Box
      component={motion.div}
      initial={{
        opacity: 0.5,
        filter: 'saturate(10%)',
      }}
      animate={{
        filter: ['saturate(10%)', 'saturate(100%)', 'saturate(10%)'],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 3,
        repeatDelay: 2,
        delay: 0.1 * index,
        repeat: Number.POSITIVE_INFINITY,
        times: [0, 0.25, 1],
      }}
      sx={{
        border: '1px solid rgba(120, 123, 255, .35)',
        borderRadius: '999px',
        position: 'absolute',
        bottom: -8,
        left: '50%',
        transform: 'translateX(-50%) translateY(50%) translateZ(0px)',
        aspectRatio: '1/1',
        width: (index + 1) * 40 + 20 * index,
      }}
    />
  );
};

const Radar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 580,
        height: 300,
        marginTop: '-40px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        pb: 4,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <RadialCircle key={i} index={i} />
        ))}
      </Box>

      <Box
        component={motion.div}
        initial={{
          opacity: 0,
        }}
        animate={{
          rotate: 180,
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          ease: 'linear',
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
          opacity: {
            times: [0, 0.25, 0.75, 1],
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
            repeatDelay: 2,
            duration: 3,
          },
        }}
        sx={{
          height: 100,
          right: '50%',
          bottom: 0,
          position: 'absolute',
          width: 300,
          borderBottom: '3px solid rgba(99, 102, 241, 0.5)',
          mask: 'linear-gradient(-90deg,transparent,#000 5%,transparent)',
          WebkitMask: 'linear-gradient(-90deg,transparent,#000 5%,transparent)',
          transformOrigin: 'bottom right',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            boxShadow: '0 -4px 18px rgb(99, 102, 241), 0 -24px 24px rgb(99, 102, 241), 0 -36px 36px rgb(99, 102, 241)',
            position: 'absolute',
            bottom: 0,
            height: '1px',
            width: '100%',
            backgroundColor: 'rgba(99, 102, 241, 0.75)',
          }}
        />
      </Box>

      <Box
        sx={{
          height: '1px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.1)',
          bottom: 0,
          position: 'absolute',
          overflow: 'hidden',
        }}
      >
        <Box
          component={motion.div}
          initial={{
            opacity: 0,
          }}
          animate={{
            x: '200%',
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
            times: [0, 0.1, 1],
          }}
          sx={{
            mask: 'linear-gradient(90deg,transparent,#000)',
            background: 'rgb(120, 123, 255)',
            width: '25%',
            height: '1px',
            position: 'absolute',
            right: '50%',
          }}
        />

        <Box
          component={motion.div}
          initial={{
            opacity: 0,
          }}
          animate={{
            x: '-200%',
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
            times: [0, 0.25, 1],
          }}
          sx={{
            mask: 'linear-gradient(90deg,#000,transparent)',
            background: 'rgb(120, 123, 255)',
            width: '25%',
            height: '1px',
            position: 'absolute',
            left: '50%',
          }}
        />
      </Box>
    </Box>
  );
};

export { Radar };
