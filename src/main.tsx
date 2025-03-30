// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';  // Stelle sicher, dass dein Chakra UI Theme korrekt importiert wird
import App from './App';

ReactDOM.createRoot(document.getElementById('app')!).render(  // Achtung, hier auf "app" achten
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
