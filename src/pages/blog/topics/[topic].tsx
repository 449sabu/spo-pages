import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import BlogCard from '@/components/atoms/BlogCard';
import Hero from '@/components/organisms/Hero';
import Layout from '@/components/templates/Layout';
import { readConfig } from '@/utils/config';
import { fetcher } from '@/utils/fetcher';
import { PoolInformation } from '@/utils/swr/poolInformation';

interface Props {
  article: {
    frontMatter: FrontMatter;
    slug: string;
  }[];
  pages: number[];
  current_page: number;
  configuration: SiteConfig;
  theme: string;
  poolInformation: PoolInformation[];
  exMetadata: ExtendedMetadata;
}
export const getStaticPaths: GetStaticPaths = async () => {
  // [page]とかぶっているのでutilsにまとめられる
  const files = fs.readdirSync('articles');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`articles/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  // topicsをフラットにして重複しているものをまとめる
  const topics = posts.map((e) => e.frontMatter.topics).flat();
  const topicList = topics.filter(
    (elem, index) => topics.indexOf(elem) === index,
  );
  const paths = topicList.map((topic) => ({ params: { topic } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // [page]とかぶっているのでutilsにまとめられる
  const files = fs.readdirSync('articles');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`articles/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  // topicsをフラットにして重複しているものをまとめる
  const topics = posts.map((e) => e.frontMatter.topics).flat();
  const topicList = topics.filter(
    (elem, index) => topics.indexOf(elem) === index,
  );

  const topic = params!.topic;

  const filteredPosts = posts.filter((article) => {
    return article.frontMatter.topics.includes(topic);
  });

  const sortedPosts = filteredPosts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date)
      ? -1
      : 1,
  );

  const configuration = readConfig();
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
      topicList,
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
