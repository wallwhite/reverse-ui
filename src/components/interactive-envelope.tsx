import { Box } from '@mui/system';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

interface InteractiveEnvelopeProps {
  onOpen?: () => void;
  onClose?: () => void;
}

const InteractiveEnvelope = ({ onOpen, onClose }: InteractiveEnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setTimeout(() => {
        onOpen?.();
      }, 500);
    } else {
      setTimeout(() => {
        onClose?.();
      }, 500);
    }
    setIsOpen((prev) => !prev);
  };

  const shakeVariants: Variants = {
    initial: {
      rotate: 0,
      x: 0
    },
    shake: {
      rotate: [0, -2, 2, -2, 2, -1, 1, 0],
      x: [0, -3, 3, -3, 3, -1, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <Box
      component={motion.div}
      variants={shakeVariants}
      initial="initial"
      animate={!isOpen ? 'shake' : undefined}
      sx={{
        position: 'relative',
        display: 'inline-block'
      }}
      onClick={handleClick}
    >
      <Box
        component={motion.div}
        initial={{
          scaleY: 1
        }}
        animate={
          isOpen
            ? {
                scaleY: -1
              }
            : undefined
        }
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1]
        }}
        sx={{
          position: 'absolute',
          top: 5.95,
          left: 0,
          transformOrigin: '50% 0.3px'
        }}
      >
        <EnvelopeTopFold />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          mt: '-15px'
        }}
      >
        <Box
          component={motion.img}
          initial={{
            y: 0,
            opacity: 1
          }}
          animate={{
            y: isOpen ? 60 : 0,
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0.8 : 1,
            rotate: isOpen ? -10 : 0
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut'
          }}
          src="/images/stamp.png"
          sx={{
            width: 58
          }}
        />
      </Box>
      <Envelope />
    </Box>
  );
};

const EnvelopeTopFold = () => {
  return (
    <svg
      width="170px"
      height="142px"
      viewBox="0 0 144 142"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        style={{ mixBlendMode: 'multiply' }}
        clipPath="url(#envelopeClip)"
        opacity="0.7"
      >
        <g filter="url(#filter0_f_3_73)">
          <path
            d="M3 0L141 0L80.5551 54.3128C77.5309 57.0302 76.0187 58.389 74.3091 58.9044C72.8032 59.3584 71.1968 59.3584 69.6909 58.9044C67.9813 58.389 66.4691 57.0302 63.4449 54.3128L3 0Z"
            fill="#334155"
            fillOpacity="0.4"
          />
        </g>
        <g filter="url(#filter1_f_3_73)">
          <path
            d="M11 0L133 0L81.5281 57.3785C78.2296 61.0556 76.5803 62.8941 74.6365 63.5726C72.9294 64.1685 71.0706 64.1685 69.3635 63.5726C67.4197 62.8941 65.7704 61.0556 62.4719 57.3785L11 0Z"
            fill="#334155"
            fillOpacity="0.2"
          />
        </g>
        <g filter="url(#filter2_f_3_73)">
          <path
            d="M3 0L141 0L81.3617 63.9599C78.1077 67.4498 76.4806 69.1947 74.5783 69.8424C72.9065 70.4115 71.0935 70.4115 69.4217 69.8424C67.5194 69.1947 65.8924 67.4498 62.6383 63.9599L3 0Z"
            fill="#334155"
            fillOpacity="0.1"
          />
        </g>
        <g filter="url(#filter3_f_3_73)">
          <path
            d="M8 0L136 0L76.4282 65.1567C74.0493 67.7585 69.9507 67.7585 67.5718 65.1567L8 0Z"
            fill="#334155"
            fillOpacity="0.05"
          />
        </g>
        <g filter="url(#filter4_f_3_73)">
          <path
            d="M2 -1L142 -1L76.0827 60.2089C73.7806 62.3466 70.2194 62.3466 67.9173 60.2089L2 -1Z"
            fill="#334155"
            fillOpacity="0.1"
          />
        </g>
      </g>
      <path
        clipPath="url(#envelopeClip)"
        d="M1.5 2L63.6546 55.3383C66.616 57.8797 68.0967 59.1504 69.7575 59.6339C71.2211 60.0601 72.7761 60.0592 74.2393 59.6314C75.8994 59.1459 77.3787 57.8736 80.3373 55.3288L143.5 1"
        stroke="#475569"
        strokeOpacity="0.06"
      />
      <g filter="url(#filter5_i_3_73)" clipPath="url(#envelopeClip)">
        <path
          d="M0 0L144 0L80.3523 54.8078C77.389 57.3595 75.9073 58.6354 74.2444 59.1214C72.7788 59.5498 71.2212 59.5498 69.7556 59.1214C68.0927 58.6354 66.611 57.3595 63.6477 54.8077L0 0Z"
          fill="url(#paint0_linear_3_73)"
        />
      </g>
      <defs>
        <clipPath id="envelopeClip">
          <rect x="0" y="0" width="145" height="96" rx="3.5px" />
        </clipPath>
        {/* Filters omitted for brevity - include all filter definitions here */}
        <linearGradient
          id="paint0_linear_3_73"
          x1="72"
          y1="0"
          x2="72"
          y2="62"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.25" stopColor="#FAFAFB" />
          <stop offset="1" stopColor="#F4F5F6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Envelope = () => {
  return (
    <svg
      width="170"
      height="145"
      viewBox="0 0 170 145"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dddd_3_7)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M157 89.2C157 93.6804 157 95.9206 156.128 97.6319C155.361 99.1372 154.137 100.361 152.632 101.128C150.921 102 148.68 102 144.2 102H25.8C21.3196 102 19.0794 102 17.3681 101.128C15.8628 100.361 14.6389 99.1372 13.8719 97.6319C13 95.9206 13 93.6804 13 89.2V9.00002C13 7.34316 14.3431 6.00002 16 6.00002V6.00002H154.5V6.00002C155.881 6.00002 157 7.11931 157 8.50002V89.2Z"
          fill="url(#paint0_linear_3_7)"
        />
        <path
          d="M144.2 102.5H25.8H25.7767C23.5562 102.5 21.8593 102.5 20.5049 102.389C19.14 102.278 18.079 102.051 17.1411 101.574C15.5417 100.759 14.2414 99.4583 13.4264 97.8589C12.9486 96.9211 12.7222 95.8601 12.6107 94.4951C12.5 93.1407 12.5 91.4438 12.5 89.2233V89.2V9.00002C12.5 7.06702 14.067 5.50002 16 5.50002H154.5C156.157 5.50002 157.5 6.84316 157.5 8.50002V89.2V89.2229C157.5 91.4436 157.5 93.1407 157.389 94.4951C157.278 95.8601 157.051 96.9211 156.574 97.8589C155.759 99.4583 154.458 100.759 152.859 101.574C151.921 102.051 150.86 102.278 149.495 102.389C148.141 102.5 146.444 102.5 144.223 102.5H144.2Z"
          stroke="url(#paint1_linear_3_7)"
        />
      </g>
      {/* Additional SVG elements omitted for brevity */}
      <defs>
        <linearGradient
          id="paint0_linear_3_7"
          x1="85"
          y1="-17.9999"
          x2="85"
          y2="102"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E6E8EA" />
          <stop offset="1" stopColor="#DDE0E3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3_7"
          x1="85"
          y1="102"
          x2="85"
          y2="-17.9999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#475569" stopOpacity="0.06" />
          <stop offset="1" stopColor="#475569" stopOpacity="0.04" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export { InteractiveEnvelope };
