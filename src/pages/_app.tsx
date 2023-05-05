import '@/styles/globals.css';
import { MeshProvider } from '@meshsdk/react';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import 'highlight.js/styles/github-dark.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <DefaultSeo />
      <Component {...pageProps} />
    </MeshProvider>
  );
}
