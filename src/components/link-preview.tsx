import { type ReactNode, useState } from 'react';
import { Box } from '@mui/system';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

interface LinkPreviewProps {
  href: string;
  children: ReactNode;
  imageSrc: string;
  imageWidth?: number;
}

const LinkPreview = ({ href, children, imageSrc, imageWidth = 220 }: LinkPreviewProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const previewX = useSpring(mouseX, {
    stiffness: 150,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - imageWidth / 2 - 8;

    mouseX.set(x);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onMouseMove={handleMouseMove}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
      <AnimatePresence>
        {isHovered && (
          <Box
            component={motion.div}
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: '100%',
              mb: '10px',
              width: imageWidth,
              pointerEvents: 'none',
              zIndex: 2,
              padding: '4px',
              background: '#fff',
              boxShadow: '0 5px 10px rgba(0,0,0,0.12)',
              borderRadius: '8px',
              display: 'flex',
            }}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              duration: 0.2,
            }}
            style={{
              x: previewX,
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt={`Preview image of URL ${href}`}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                display: 'block',
              }}
            />
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export { LinkPreview };
