
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property="og:site_name" content="Find jobs and talents in Cosmos Blockchain" />
          <meta property='og:title' content='Find jobs and talents in Cosmos Blockchain' />
          <meta property="og:description" content="Find jobs and talents in Cosmos Blockchain" />
          <meta property="og:url" content="https://cosmos-sandy.vercel.app/" />
          <meta property="og:image" itemProp="image" content="https://cosmos-sandy.vercel.app/OG.png" />
          <meta property="og:type" content="website" />

          <link rel="icon" type="image/svg+xml" href="/Favicon.ico" />
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