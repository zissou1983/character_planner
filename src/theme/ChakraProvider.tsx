// src/ChakraFixedProvider.tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';

const theme = extendTheme({});

interface Props {
  children: ReactNode;
}

export default function ChakraFixedProvider({ children }: Props) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
