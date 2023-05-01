import fs from 'fs';
import { ParsedUrlQuery } from 'node:querystring';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Layout from '@/components/templates/Layout';
import { readConfig } from '@/utils/config';

interface Params extends ParsedUrlQuery {
  page: string;
}

type Props = {
  frontMatter: FrontMatter;
  content: string;
  configuration: SiteConfig;
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

  return {
    props: {
      frontMatter: data,
      content,
      // article: ""
      configuration,
    },
  };
};

const Article: NextPage<Props> = ({ frontMatter, content, configuration }) => {
  return (
    <Layout footer={configuration.footer}>
      <h1>{frontMatter.title}</h1>
      <div>{content}</div>
    </Layout>
  );
};

export default Article;
