import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import RootLayout from '@/components/layout';
import { Urbanist } from "next/font/google";
import { Provider } from 'react-redux';
import store from '@/lib/store';

const urbanist = Urbanist({ subsets: ["latin"], variable: '--font-urbanist', });
// const inter = Inter({ subsets: ["latin"], variable: '--font-inter', });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <Provider store={store}>

      <div className={` ${urbanist.className} `}>
        <RootLayout >
          <Component {...pageProps} />
        </RootLayout>
      </div>
    </Provider>
  );
};

export default App;