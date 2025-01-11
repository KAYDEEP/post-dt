'use client';

import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

// export const metadata: Metadata = {
//   title: 'Blog Post App',
//   description: 'A Blog Post Application',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Provider store={store}>
       
            {children}
   
        </Provider>
      </body>
    </html>
  );
}
