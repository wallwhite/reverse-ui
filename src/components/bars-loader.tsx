import { Box, keyframes } from '@mui/system';

const fillKeyframe = keyframes`
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
`;

const BarsLoader = () => {
  return (
    <Box
      sx={{
        border: '1px solid #c5e2fe',
        padding: '4px',
        display: 'flex',
        gap: '4px',
      }}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: 10,
            height: 20,
            background: '#c5e2fe',
            animation: `${fillKeyframe} 1s ease-in-out infinite`,
            animationDelay: `${index * 0.08}s`,
          }}
        />
      ))}
    </Box>
  );
};

export { BarsLoader };
