import { Box, keyframes } from '@mui/system';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const borderGradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

interface GradientBadgeProps {
  label?: string;
}

const GradientBadge = ({ label = '' }: GradientBadgeProps) => {
  return (
    <Box
      sx={{
        borderRadius: '999px',
        padding: '4px 14px',
        background:
          'linear-gradient(135deg, rgba(202,183,255,.04) 0%, rgba(255,155,197,.04) 50%, rgba(255,202,149,.04) 100%)',
        boxShadow: '0 -4px 12px rgb(212 158 255 / 12%) inset',
        fontSize: 14,
        fontWeight: 400,
        position: 'relative',
        '&:before': {
          content: '""',
          background:
            'linear-gradient(135deg, rgba(202,183,255,.2) 0%, rgba(255,155,197,.2) 50%, rgba(255,202,149,.2) 100%)',
          backgroundSize: '200% 200%',
          animation: `${borderGradientAnimation} 5s ease infinite`,
          borderRadius: 'inherit',
          position: 'absolute',
          inset: 0,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
          pointerEvents: 'none',
        },
      }}
    >
      <Box
        sx={{
          backgroundImage: 'linear-gradient(135deg, #cab7ff 0%, #ff9bc5 50%, #ffca95 100%)',
          backgroundSize: '200% 200%',
          animation: `${gradientAnimation} 5s ease infinite`,
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {label}
      </Box>
    </Box>
  );
};

export { GradientBadge };
