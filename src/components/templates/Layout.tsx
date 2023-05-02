import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

interface LayoutProps {
  children: React.ReactNode;
  footer: SiteConfig['footer'];
  poolInformation: PoolInformation;
  exMetadata?: ExtendedMetadata;
}

const Layout = ({
  children,
  footer,
  poolInformation,
  exMetadata,
}: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer
        footer_data={footer}
        poolInformation={poolInformation}
        exMetadata={exMetadata}
      />
    </>
  );
};

export default Layout;
