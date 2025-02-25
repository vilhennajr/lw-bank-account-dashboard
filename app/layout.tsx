'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { CookiesProvider } from 'react-cookie';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Minha Aplicação</title>
      </head>
      <body>
        <Provider store={store}>
          <ChakraProvider>
            <CookiesProvider>
              {children}
            </CookiesProvider>
          </ChakraProvider>
        </Provider>
      </body>
    </html>
  );
}
