import fs from 'fs';
import { ParsedUrlQuery } from 'node:querystring';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CardanoLogo from '../../../../public/Cardano-RGB_Logo-Icon-White.png';
import Card from '@/components/Card';
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
const PAGE_SIZE = 1;

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
      <div className="max-w-4xl md:m-auto md:my-12 m-8 grid grid-col md:grid-cols-3 gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination pages={pages} current_page={current_page} />
    </div>
    // <BlogLayout topicList={topics}>
    //   <div>
    //     {article.map((post) => (
    //       <Link href={`/blog/${post.slug}`} key={post.slug}>
    //         <div className="p-6 border-gray-500 flex-none lg:flex">
    //           <div className="w-80">
    //             {post.frontMatter.image ? (
    //               <Image
    //                 className="rounded-md"
    //                 src={`https://raw.githubusercontent.com/449sabu/zenn-posts/main/images/ogp-image/${post.frontMatter.image}`}
    //                 width={1200}
    //                 height={630}
    //                 alt={post.frontMatter.title}
    //               />
    //             ) : (
    //               <Image
    //                 className="rounded-md"
    //                 src="https://raw.githubusercontent.com/449sabu/zenn-posts/main/images/ogp-image/main.png"
    //                 width={1200}
    //                 height={630}
    //                 alt={post.frontMatter.title}
    //               />
    //             )}
    //           </div>
    //           <div className="pl-12">
    //             <h1 className="text-xl font-bold">{post.frontMatter.title}</h1>
    //             <div className="py-4">
    //               {post.frontMatter.published_at ? (
    //                 <TimeLine
    //                   date={formatDate(post.frontMatter.published_at)}
    //                 />
    //               ) : null}
    //             </div>
    //             <p>{post.frontMatter.description}</p>
    //           </div>
    //         </div>
    //       </Link>
    //     ))}
    //     <Pagination pages={pages} current_page={current_page} />
    //   </div>
    // </BlogLayout>
  );
};

export default Page;
