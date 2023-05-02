import fs from 'fs';
import { ParsedUrlQuery } from 'node:querystring';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '@/components/templates/Layout';
import { readConfig } from '@/utils/config';
import { fetcher } from '@/utils/fetcher';
import { PoolInformation } from '@/utils/swr/poolInformation';

interface Params extends ParsedUrlQuery {
  page: string;
}

type Props = {
  frontMatter: FrontMatter;
  content: string;
  configuration: SiteConfig;
  poolInformation: PoolInformation[];
  exMetadata: ExtendedMetadata;
};

export const getStaticPaths: GetStaticPaths = () => {
  const files = fs.readdirSync('articles');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const file = fs.readFileSync(`articles/${params!.slug}.md`, 'utf-8');
  const { data, content } = matter(file);

  const configuration = readConfig();
  const poolInformation = await PoolInformation(
    process.env.NEXT_PUBLIC_POOL_ID || '',
  );
  const metadata = await fetcher(poolInformation[0].meta_url || '');
  const exMetadata = await fetcher(metadata.extended || '');

  return {
    props: {
      frontMatter: data,
      content,
      // article: ""
      configuration,
      poolInformation,
      exMetadata,
    },
  };
};

const Article: NextPage<Props> = ({
  frontMatter,
  content,
  configuration,
  poolInformation,
  exMetadata,
}) => {
  return (
    <Layout
      footer={configuration.footer}
      poolInformation={poolInformation[0]}
      exMetadata={exMetadata}
    >
      <h1>{frontMatter.title}</h1>
      <div>{content}</div>
    </Layout>
  );
};

export default Article;
