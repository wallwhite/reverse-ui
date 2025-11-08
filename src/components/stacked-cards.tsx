import { Box } from '@mui/system';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useState, ReactNode } from 'react';

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

const StackedCards = ({
  sensitivity = 220,
  dimensions = { width: 220, height: 220 },
  images = []
}: StackedCardsProps) => {
  const [cards, setCards] = useState<CardData[]>(
    images.map((img) => ({
      id: img,
      img
    }))
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
        perspective: 600
      }}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id}
          onSendToBack={() => sendToBack(card.id)}
          sensitivity={sensitivity}
        >
          <Box
            component={motion.div}
            sx={{
              overflow: 'hidden',
              borderRadius: '8px',
              border: '5px solid #fff',
              width: dimensions.width,
              height: dimensions.height
            }}
            animate={{
              rotateZ: (cards.length - index - 1) * 4,
              scale: 1 + index * 0.05 - cards.length * 0.05,
              transformOrigin: '90% 90%'
            }}
            initial={false}
            transition={{
              type: 'spring',
              stiffness: 250,
              damping: 25
            }}
          >
            <Box
              component="img"
              src={card.img}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export { StackedCards };

interface CardProps {
  children: ReactNode;
  sensitivity: number;
  onSendToBack: () => void;
}

const Card = ({ children, sensitivity, onSendToBack }: CardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
      return;
    }
    x.set(0);
    y.set(0);
  };

  return (
    <Box
      component={motion.div}
      style={{
        x,
        y,
        rotateX,
        rotateY
      }}
      drag
      whileTap={{
        cursor: 'grabbing'
      }}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      sx={{
        position: 'absolute',
        cursor: 'grab'
      }}
    >
      {children}
    </Box>
  );
};
