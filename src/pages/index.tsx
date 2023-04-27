import { GetStaticProps, NextPage } from 'next';

import Blog from '@/components/Blog';
import Hero from '@/components/Hero';
import Status from '@/components/Status';
import { readConfig } from '@/utils/config';
import { fetchPoolInfo } from '@/utils/pool_data';

type Props = {
  poolInformation: PoolInformation;
  configuration: SiteConfig;
};

export const getStaticProps: GetStaticProps = async () => {
  const poolInformation = await fetchPoolInfo(process.env.POOL_ID || '');
  const configuration = readConfig();

  return {
    props: {
      poolInformation,
      configuration,
    },
  };
};

const Home: NextPage<Props> = ({ poolInformation }) => {
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
