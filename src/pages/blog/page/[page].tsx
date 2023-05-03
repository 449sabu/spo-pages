import fs from 'fs';
import { ParsedUrlQuery } from 'node:querystring';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import BlogCard from '@/components/atoms/BlogCard';
import Pagination from '@/components/modecules/Pagination';
import Layout from '@/components/templates/Layout';
import { readConfig } from '@/utils/config';
import { fetcher } from '@/utils/fetcher';
import { PoolInformation } from '@/utils/swr/poolInformation';

interface Params extends ParsedUrlQuery {
  page: string;
}

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

const PAGE_SIZE = 5;
const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('articles');
  const count = files.length;
  const paths = range(1, Math.ceil(count / PAGE_SIZE)).map((i) => ({
    params: { page: i.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const current_page = Number(params!.page);
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

  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date)
      ? -1
      : 1,
  );

  const slicedPosts = sortedPosts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page,
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
      article: slicedPosts,
      pages,
      current_page,
      configuration,
      theme,
      poolInformation,
      exMetadata,
    },
  };
};

const Page: NextPage<Props> = ({
  article,
  pages,
  current_page,
  configuration,
  theme,
  poolInformation,
  exMetadata,
}) => {
  return (
    <Layout
      configuration={configuration}
      poolInformation={poolInformation[0]}
      exMetadata={exMetadata}
    >
      <div className={`${theme}`}>
        <div className="h-80 md:h-96 max-w-4xl m-auto md:grid md:grid-cols-2">
          <div className="m-4 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold pb-4">
              {configuration.blog.title}
            </h1>
            <p className="pb-4">{configuration.blog.description}</p>
          </div>
          <div className="m-auto invisible md:visible">
            <Image
              src="/Cardano-Logo-White.png"
              width={260}
              height={260}
              alt="logo"
              className="opacity-60 m-auto"
            />
          </div>
        </div>
        <div className={`${theme} wave`}></div>
      </div>
      <div className="max-w-6xl lg:m-auto lg:my-12 grid gap-8 lg:grid-cols-3 m-4">
        {article.map((e, i) => (
          <BlogCard
            image="/Cardano.png"
            title={e.frontMatter.title}
            date={e.frontMatter.date}
            slug={e.slug}
            key={i}
          />
        ))}
      </div>
      <div className="my-12 text-center">
        <Pagination pages={pages} current_page={current_page} />
      </div>
    </Layout>
  );
};

export default Page;
