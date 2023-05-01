import { GetStaticProps, NextPage } from 'next';

import Blog from '@/components/Blog';
import Hero from '@/components/Hero';
import Status from '@/components/Status';
import Layout from '@/components/templates/Layout';
import { readConfig } from '@/utils/config';
import { fetcher } from '@/utils/pool_data';
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
      poolInformation: poolInformation,
      exMetadata,
      configuration,
    },
  };
};

const Home: NextPage<Props> = ({ poolInformation, configuration }) => {
  const { mutate } = useMetadata(poolInformation);
  const bgColor = 'bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400';

  return (
    <Layout footer={configuration.footer}>
      <Hero bgColor={bgColor} pool_information={poolInformation[0]} />
      <div className={`${bgColor} wave`}></div>
      <Status pool_information={poolInformation[0]} />
      <Blog />
    </Layout>
  );
};

export default Home;
