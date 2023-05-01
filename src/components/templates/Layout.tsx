import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

interface LayoutProps {
  children: React.ReactNode;
  footer: SiteConfig['footer'];
}

const Layout = ({ children, footer }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer footer_data={footer} />
    </>
  );
};

export default Layout;
