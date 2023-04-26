// import { KoiosProvider } from '@meshsdk/core';
import { GetStaticProps, NextPage } from 'next';

import Blog from '@/components/Blog';
import Hero from '@/components/Hero';
import Status from '@/components/Status';
import { readConfig, reedSiteConfig } from '@/utils/config';
import {
  fetchDelegatorHistory,
  fetchPoolInfo,
  fetchPoolMetadata,
} from '@/utils/pool_data';

type Props = {
  theme: string;
  poolInformation: PoolInformation;
  configuration: SiteConfig;
};

export const getStaticProps: GetStaticProps = async () => {
  // const theme = reedSiteConfig();
  const poolId = process.env.POOL_ID || '';
  const poolInformation = await fetchPoolInfo(poolId);
  const metadata = await fetchPoolMetadata(poolInformation.meta_url || '');
  // const DelegatorHistory = await fetchDelegatorHistory(poolId);

  const configuration = readConfig();

  const theme = process.env.NEXT_PUBLIC_THEME || '';
  // console.log(theme)
  // console.log(poolInformation);

  return {
    props: {
      theme,
      poolInformation,
      configuration,
    },
  };
};

const Home: NextPage<Props> = ({ poolInformation, configuration, theme }) => {
  const bgColor = 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400';

  return (
    <div>
      <Hero bgColor={bgColor} pool_information={poolInformation} />
      <div className={`${bgColor} wave`}></div>
      <Status pool_information={poolInformation} />
      <Blog />
    </div>
  );
};

export default Home;
