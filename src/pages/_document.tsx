
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/svg+xml" href="/Favicon.ico" />
          <meta property="og:url" content="https://cosmos-sandy.vercel.app/" />
          <meta property="og:title" content="Jobs in Cosmos Blockchain" />
          <meta property="og:description" content="Find jobs and talents in Cosmos Blockchain" />
          <meta property="og:image" content="https://cosmos-sandy.vercel.app/og.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="https://cosmos-sandy.vercel.app/" />
          <meta property="twitter:url" content="https://cosmos-sandy.vercel.app/" />
          <meta name="twitter:title" content="Jobs in Cosmos Blockchain" />
          <meta name="twitter:description" content="Find jobs and talents in Cosmos Blockchain" />
          <meta name="twitter:image" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;