import React from 'react';
import { type AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';
import '@/styles/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { lora } from '@/lib/fonts';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <LanguageProvider>
      <main className={lora.variable}>
        <Component {...pageProps} />
      </main>
    </LanguageProvider>
  </ChakraProvider>
);

export default App;
