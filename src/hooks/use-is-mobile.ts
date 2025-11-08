import { useTheme, useMediaQuery } from '@mui/system';

export const useIsMobile = (): boolean => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};
