import fs from 'fs';
import { ParsedUrlQuery } from 'node:querystring';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CardanoLogo from '../../../../public/Cardano-RGB_Logo-Icon-White.png';
import Pagination from '@/components/Pagination';
import { readConfig } from '@/utils/config';

interface Params extends ParsedUrlQuery {
  page: string;
}

interface Props {
  article: {
    frontMatter: {
      [key: string]: any;
    };
    slug: string;
  }[];
  pages: number[];
  current_page: any;
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
    <div>
      <div className={`${bgColor}`}>
        <div className="h-80 md:h-96 max-w-4xl m-auto md:grid md:grid-cols-2">
          <div className="m-4 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold pb-4">
              {configuration.blog.title}
            </h1>
            <p className="pb-4">{configuration.blog.description}</p>
            <button className="bg-orange-300 py-2 px-4 rounded-full w-44">
              Start Staking
            </button>
          </div>
          <div className="m-auto invisible md:visible">
            <Image
              src={CardanoLogo}
              width={260}
              height={260}
              alt="logo"
              className="opacity-60 m-auto"
            />
          </div>
        </div>
        <div className={`${bgColor} wave`}></div>
      </div>
      <div className="max-w-4xl m-auto grid gap-8 grid-cols-1 grid-rows-5 my-12">
        {article.map((e, i) => (
          <Link key={i} href={`/blog/${e.slug}`} className="flex">
            <Image
              className="rounded-md"
              src="https://raw.githubusercontent.com/449sabu/zenn-posts/main/images/ogp-image/main.png"
              width={300}
              height={300}
              alt={e.frontMatter.title}
            />
            <div className="pl-12">
              <p className="text-2xl">{e.frontMatter.title}</p>
              <p className="text-xl">{e.frontMatter.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination pages={pages} current_page={current_page} />
    </div>
  );
};

export default Page;
