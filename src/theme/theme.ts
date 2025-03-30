// src/theme/theme.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6f1ff',
      100: '#b3d4ff',
      200: '#80b8ff',
      300: '#4d9cff',
      400: '#1a80ff',
      500: '#0066e6',
      600: '#004db4',
      700: '#003482',
      800: '#001b51',
      900: '#000321',
    },
  },
  fonts: {
    heading: `'Cinzel', serif`,
    body: `'Open Sans', sans-serif`,
  },
});

export default theme;  // Hier der Standard-Export
