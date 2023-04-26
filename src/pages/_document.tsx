import { Html, Head, Main, NextScript } from 'next/document';
import Footer from '@/components/Footer';
import { readConfig, reedSiteConfig } from '@/utils/config';

export default function Document() {
  const configuration = readConfig();

  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <Footer footer_data={configuration.footer} />
    </Html>
  );
}
