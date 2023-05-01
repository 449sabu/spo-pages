import fs from 'fs';
import { ParsedUrlQuery } from 'node:querystring';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import Layout from '@/components/templates/Layout';
import { readConfig } from '@/utils/config';

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
  // topics: string[];
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

  // configuration
  const configuration = readConfig();

  return {
    props: {
      article: slicedPosts,
      pages,
      current_page,
      configuration,
      // topics,
    },
  };
};

const Page: NextPage<Props> = ({
  article,
  pages,
  current_page,
  configuration,
}) => {
  const bgColor = 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400';

  return (
    <Layout footer={configuration.footer}>
      <div className={`${bgColor}`}>
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
        <div className={`${bgColor} wave`}></div>
      </div>
      <div className="max-w-6xl m-auto grid gap-8 grid-cols-3 my-12">
        {article.map((e, i) => (
          <BlogCard
            image="/Cardano.png"
            title={e.frontMatter.title}
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
