import { ReactNode } from 'react';
import ServiceBar from './ServiceBar';
import MainHeader from './MainHeader';
import Footer from './Footer';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ServiceBar />
      <MainHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
