import fs from 'fs';
import { ParsedUrlQuery } from 'node:querystring';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import BreadCrumb from '@/components/modecules/BreadCrumb';
import BlogLayout from '@/components/templates/BlogLayout';
import Layout from '@/components/templates/Layout';
import { createTopics, readArticles, readConfigFile } from '@/utils/config';
import { fetcher } from '@/utils/fetcher';
import {
  markdownToHtml,
  markdownToIndex,
} from '@/utils/markdownToHtml/markdownToHtml';
import { PoolInformation } from '@/utils/swr/poolInformation';

interface Params extends ParsedUrlQuery {
  page: string;
}

type Props = {
  frontMatter: FrontMatter;
  html: string;
  htmlIndex: string;
  configuration: SiteConfig;
  poolInformation: PoolInformation[];
  exMetadata: ExtendedMetadata;
  topics: string[];
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
  const html = await markdownToHtml(content);
  const htmlIndex = await markdownToIndex(content);

  const configuration = readConfigFile();
  const poolInformation = await PoolInformation(
    process.env.NEXT_PUBLIC_POOL_ID || '',
  );
  const metadata = await fetcher(poolInformation[0].meta_url || '');
  const exMetadata = await fetcher(metadata.extended || '');
  // topics
  const articles = readArticles();
  const topics = createTopics(articles);

  return {
    props: {
      frontMatter: data,
      html,
      htmlIndex,
      configuration,
      poolInformation,
      exMetadata,
      topics,
    },
  };
};

const Article: NextPage<Props> = ({
  frontMatter,
  html,
  htmlIndex,
  configuration,
  poolInformation,
  exMetadata,
  topics,
}) => {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        openGraph={{
          type: 'website',
          // url: `http:localhost:3000/posts/${slug}`,
          title: frontMatter.title,
          description: frontMatter.description,
          images: [
            {
              url: `https://localhost:3000/${frontMatter.image}`,
              width: 1200,
              height: 630,
              alt: frontMatter.title,
            },
          ],
        }}
      />
      <Layout
        configuration={configuration}
        poolInformation={poolInformation[0]}
        exMetadata={exMetadata}
      >
        <div className="bg-blue-50">
          <BlogLayout blog_index={htmlIndex} topic_list={topics}>
            <div>
              <div className="px-4 lg:p-0">
                <BreadCrumb title={frontMatter.title} />
              </div>
              <div className="bg-white rounded-lg drop-shadow-md px-4 md:px-6 my-4 lg:my-7">
                <h1 className="py-8 text-3xl font-bold">{frontMatter.title}</h1>
                {frontMatter.image ? (
                  <Image
                    src={frontMatter.image}
                    height={630}
                    width={1200}
                    alt={frontMatter.title}
                    className="pb-8"
                  />
                ) : (
                  <Image
                    src="/cardano.png"
                    height={630}
                    width={1200}
                    alt={frontMatter.title}
                    className="pb-8"
                  />
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: html }}
                  className="prose max-w-none prose-blue pb-4"
                />
              </div>
            </div>
          </BlogLayout>
        </div>
      </Layout>
    </>
  );
};

export default Article;
