import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import s from './layout.module.scss'


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div className={s.layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;