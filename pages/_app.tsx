import {type AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import theme from '../components/BasicTheme';
import {extendTheme} from '@chakra-ui/react'

const App = ({Component, pageProps, router}: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default App;

