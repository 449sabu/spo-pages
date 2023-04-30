import fs from 'fs';
import { ParsedUrlQuery } from 'node:querystring';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface Params extends ParsedUrlQuery {
  page: string;
}

type Props = {
  frontMatter: FrontMatter;
  content: string;
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

  return {
    props: {
      frontMatter: data,
      content,
      // article: ""
    },
  };
};

const Article: NextPage<Props> = ({ frontMatter, content }) => {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <div>{content}</div>
    </div>
  );
};

export default Article;
