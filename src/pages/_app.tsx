import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import RootLayout from '@/components/layout';
import { Urbanist } from "next/font/google";
import { Provider } from 'react-redux';
import store from '@/lib/store';
import { useEffect, useState } from 'react';
import { TJob } from '@/lib/types';
import { useRouter } from 'next/router';


const urbanist = Urbanist({ subsets: ["latin"] });
// const inter = Inter({ subsets: ["latin"], variable: '--font-inter', });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [records, setRecords] = useState<TJob[]>([])
  const [tags, setTags] = useState<string[]>([])
  const { pathname } = useRouter()
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    if (pathname === '/' && !isFetched) fetchDataOnMount();
  }, [pathname]);

  async function fetchDataOnMount() {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const { allRecords, uniqueTags } = await response.json();
        setTags(uniqueTags)
        setRecords(allRecords)
        setIsFetched(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }

  const pagePropsWithCustomData = { ...pageProps, customData: { records, tags, isFetched } };
  return (
    <Provider store={store}>
      <div className={urbanist.className}>
        <RootLayout >
          <Component {...pagePropsWithCustomData} />
        </RootLayout>
      </div>
    </Provider>
  );
};

export default App;