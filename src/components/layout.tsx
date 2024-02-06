import { Header } from './header/Header';
import { Footer } from './footer/Footer';


const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;