import { GetStaticProps, NextPage } from 'next';

import Blog from '@/components/organisms/Blog';
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
  theme: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const configuration = readConfig();
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
  const { mutate } = useMetadata(poolInformation);

  return (
    <Layout
      configuration={configuration}
      poolInformation={poolInformation[0]}
      exMetadata={exMetadata}
    >
      <Hero theme={theme} pool_information={poolInformation[0]} />
      <div className={`${theme} wave`}></div>
      <Status theme={theme} pool_information={poolInformation[0]} />
      {configuration.blog.enable ? <Blog /> : null}
    </Layout>
  );
};

export default Home;
