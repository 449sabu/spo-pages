import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Hero from '@/components/organisms/Hero';
import Status from '@/components/organisms/Status';
import Layout from '@/components/templates/Layout';
import { readConfigFile } from '@/utils/config';
import { fetcher } from '@/utils/fetcher';
import { PoolInformation } from '@/utils/swr/poolInformation';

type Props = {
  poolInformation: PoolInformation[];
  exMetadata: ExtendedMetadata;
  configuration: SiteConfig;
  theme: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const configuration = readConfigFile();
  const theme = configuration.theme;

  const poolInformation = await PoolInformation(
    process.env.NEXT_PUBLIC_POOL_ID || '',
  );
  const metadata = await fetcher(poolInformation[0].meta_url || '');
  const exMetadata = await fetcher(metadata.extended || '');

  return {
    props: {
      poolInformation,
      exMetadata,
      configuration,
      theme,
    },
  };
};

const Home: NextPage<Props> = ({
  poolInformation,
  configuration,
  exMetadata,
  theme,
}) => {
  // const { mutate } = useMetadata(poolInformation);

  return (
    <>
      <NextSeo
        title={poolInformation[0].meta_json.name}
        description={poolInformation[0].meta_json.description}
        openGraph={{
          type: 'website',
          url: `https://${process.env.VERCEL_URL}`,
          title: poolInformation[0].meta_json.name,
          description: poolInformation[0].meta_json.description,
          images: [
            {
              url: `https://${process.env.VERCEL_URL}/cardano.png`,
              width: 1200,
              height: 630,
              alt: poolInformation[0].meta_json.name,
            },
          ],
        }}
      />
      <Layout
        configuration={configuration}
        poolInformation={poolInformation[0]}
        exMetadata={exMetadata}
      >
        <Hero theme={theme} pool_information={poolInformation[0]} />
        <div className={`${theme} wave`}></div>
        <Status theme={theme} pool_information={poolInformation[0]} />
      </Layout>
    </>
  );
};

export default Home;
