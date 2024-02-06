import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import RootLayout from '@/components/layout';
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <div className={urbanist.className}>
      <RootLayout >
        <Component {...pageProps} />
      </RootLayout>
    </div>
  );
};

export default App;