import '@/styles/globals.css';
import 'highlight.js/styles/github-dark.css';
import { MeshProvider } from '@meshsdk/react';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <DefaultSeo />
      <Component {...pageProps} />
    </MeshProvider>
  );
}
