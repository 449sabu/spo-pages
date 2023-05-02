import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';

interface LayoutProps {
  children: React.ReactNode;
  configuration: SiteConfig;
  poolInformation: PoolInformation;
  exMetadata?: ExtendedMetadata;
}

const Layout = ({
  children,
  configuration,
  poolInformation,
  exMetadata,
}: LayoutProps) => {
  return (
    <>
      <Header configuration={configuration} />
      <main>{children}</main>
      <Footer
        footer_data={configuration.footer}
        poolInformation={poolInformation}
        exMetadata={exMetadata}
      />
    </>
  );
};

export default Layout;
