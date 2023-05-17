import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import BlogCard from '@/components/atoms/BlogCard';
import Hero from '@/components/organisms/Hero';
import Layout from '@/components/templates/Layout';
import { readConfigFile, readArticles, createTopics } from '@/utils/config';
import { fetcher } from '@/utils/fetcher';
import { PoolInformation } from '@/utils/swr/poolInformation';

interface Props {
  article: {
    frontMatter: FrontMatter;
    slug: string;
  }[];
  topics: string[];
  pages: number[];
  current_page: number;
  configuration: SiteConfig;
  theme: string;
  poolInformation: PoolInformation[];
  exMetadata: ExtendedMetadata;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = readArticles();
  const topics = createTopics(articles);

  const paths = topics.map((topic) => ({ params: { topic } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const topic = params!.topic;

  const articles = readArticles();
  const topics = createTopics(articles);

  const filteredPosts = articles.filter((article) => {
    return article.frontMatter.topics.includes(topic);
  });

  const sortedPosts = filteredPosts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date)
      ? -1
      : 1,
  );

  const configuration = readConfigFile();
  const theme = configuration.theme;
  const poolInformation = await PoolInformation(
    process.env.NEXT_PUBLIC_POOL_ID || '',
  );
  const metadata = await fetcher(poolInformation[0].meta_url || '');
  const exMetadata = await fetcher(metadata.extended || '');

  return {
    props: {
      article: sortedPosts,
      theme,
      topics,
      configuration,
      poolInformation,
      exMetadata,
    },
  };
};

const tag: NextPage<Props> = ({
  article,
  theme,
  configuration,
  poolInformation,
  exMetadata,
}) => {
  return (
    <Layout
      configuration={configuration}
      poolInformation={poolInformation[0]}
      exMetadata={exMetadata}
    >
      <div>
        <Hero theme={theme} pool_information={poolInformation[0]} />
        <div className={`${theme} wave`}></div>
        <div className="max-w-6xl lg:m-auto lg:my-12 grid gap-8 lg:grid-cols-3 m-4">
          {article.map((e, i) => (
            <BlogCard
              image="/Cardano.png"
              title={e.frontMatter.title}
              date={e.frontMatter.date}
              slug={e.slug}
              key={i}
              topics={e.frontMatter.topics}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default tag;
