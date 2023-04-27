import { GetStaticProps, NextPage } from 'next';

import Blog from '@/components/Blog';
import Hero from '@/components/Hero';
import Status from '@/components/Status';
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
  const poolInformation = await PoolInformation(process.env.POOL_ID || '');
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

const Home: NextPage<Props> = ({ poolInformation }) => {
  const { mutate } = useMetadata(poolInformation);
  const bgColor = 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400';

  return (
    <div>
      <Hero bgColor={bgColor} pool_information={poolInformation[0]} />
      <div className={`${bgColor} wave`}></div>
      <Status pool_information={poolInformation[0]} />
      <Blog />
    </div>
  );
};

export default Home;
