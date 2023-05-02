import { GetStaticProps, NextPage } from 'next';

import Blog from '@/components/Blog';
import Hero from '@/components/organisms/Hero';
import Status from '@/components/organisms/Status';
import Layout from '@/components/templates/Layout';
import { readConfig } from '@/utils/config';
import { fetcher } from '@/utils/fetcher';
import { PoolInformation, useMetadata } from '@/utils/swr/poolInformation';

type Props = {
  poolInformation: PoolInformation[];
  exMetadata: ExtendedMetadata;
  configuration: SiteConfig;
};

export const getStaticProps: GetStaticProps = async () => {
  const configuration = readConfig();
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
    },
  };
};

const Home: NextPage<Props> = ({
  poolInformation,
  configuration,
  exMetadata,
}) => {
  const { mutate } = useMetadata(poolInformation);
  const bgColor = 'bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400';

  return (
    <Layout
      footer={configuration.footer}
      poolInformation={poolInformation[0]}
      exMetadata={exMetadata}
    >
      <Hero bgColor={bgColor} pool_information={poolInformation[0]} />
      <div className={`${bgColor} wave`}></div>
      <Status pool_information={poolInformation[0]} />
      <Blog />
    </Layout>
  );
};

export default Home;
