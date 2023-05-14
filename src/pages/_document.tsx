import { Html, Head, Main, NextScript } from 'next/document';
// import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* <Script src="https://embed.zenn.studio/js/listen-embed-event.js"></Script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
