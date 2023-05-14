import '@/styles/globals.css';
import 'highlight.js/styles/github-dark.css';
import { MeshProvider } from '@meshsdk/react';
import mermaid from 'mermaid';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   mermaid.initialize({});
  //   console.log('mermaid app');
  // }, []);

  return (
    <MeshProvider>
      <DefaultSeo />
      <Component {...pageProps} />
    </MeshProvider>
  );
}
