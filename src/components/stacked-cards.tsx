import { useState, type ReactNode } from 'react';
import { Box } from '@mui/system';
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';

interface Dimensions {
  width: number;
  height: number;
}

interface CardData {
  id: string;
  img: string;
}

interface StackedCardsProps {
  sensitivity?: number;
  dimensions?: Dimensions;
  images?: string[];
}

interface CardProps {
  children: ReactNode;
  sensitivity: number;
  onSendToBack: () => void;
}

const Card = ({ children, sensitivity, onSendToBack }: CardProps) => {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-200, 200], [-45, 45]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > sensitivity) {
      onSendToBack();
    }
  };

  return (
    <Box
      component={motion.div}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }}
      style={{
        x,
        rotateZ,
        opacity,
      }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </Box>
  );
};

const StackedCards = ({
  sensitivity = 220,
  dimensions = { width: 220, height: 220 },
  images = [],
}: StackedCardsProps) => {
  const [cards, setCards] = useState<CardData[]>(
    images.map((img) => ({
      id: img,
      img,
    })),
  );

  const sendToBack = (id: string) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);

      newCards.unshift(card);

      return newCards;
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: dimensions.width,
        height: dimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          onSendToBack={() => {
            sendToBack(card.id);
          }}
          sensitivity={sensitivity}
        >
          <Box
            component={motion.div}
            sx={{
              overflow: 'hidden',
              borderRadius: '8px',
              border: '5px solid #fff',
              width: dimensions.width,
              height: dimensions.height,
            }}
            animate={{
              rotateZ: (cards.length - index - 1) * 4,
              scale: 1 + index * 0.05 - cards.length * 0.05,
              transformOrigin: '90% 90%',
            }}
            initial={false}
            transition={{
              type: 'spring',
              stiffness: 250,
              damping: 25,
            }}
          >
            <Box
              component="img"
              src={card.img}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
              }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export { StackedCards };
