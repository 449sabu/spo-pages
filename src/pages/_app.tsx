import '@/styles/globals.css';
import { MeshProvider } from '@meshsdk/react';
import type { AppProps } from 'next/app';
import Navigation from '@/components/Navigation';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Navigation />
      <Component {...pageProps} />
    </MeshProvider>
  );
}
