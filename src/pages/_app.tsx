import React from 'react';
import { type AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Lora } from 'next/font/google';
import theme from '@/theme';
import '@/styles/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const lora = Lora({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400'],
  variable: '--font-lora',
  display: 'swap',
});

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
