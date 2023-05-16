import fs from 'fs';
import { ParsedUrlQuery } from 'node:querystring';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import BreadCrumb from '@/components/modecules/BreadCrumb';
import BlogLayout from '@/components/templates/BlogLayout';
import Layout from '@/components/templates/Layout';
import { readConfig } from '@/utils/config';
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

  const configuration = readConfig();
  const poolInformation = await PoolInformation(
    process.env.NEXT_PUBLIC_POOL_ID || '',
  );
  const metadata = await fetcher(poolInformation[0].meta_url || '');
  const exMetadata = await fetcher(metadata.extended || '');

  return {
    props: {
      frontMatter: data,
      html,
      htmlIndex,
      configuration,
      poolInformation,
      exMetadata,
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
        <BlogLayout blogIndex={htmlIndex}>
          <div>
            <BreadCrumb title={frontMatter.title} />
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
              className="prose max-w-none prose-blue"
            />
          </div>
        </BlogLayout>
      </Layout>
    </>
  );
};

export default Article;
