import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Article {
  frontMatter: FrontMatter;
  slug: string;
}
export const readConfigFile = () => {
  const filePath = path.join(
    process.cwd(),
    'configuration',
    'main.config.json',
  );
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const contents: SiteConfig = JSON.parse(fileContents);

  return contents;
};

/**
 *  ./articles 内の全ての記事から 'published === true' の記事のみのあ新しい配列を返す。
 */
export const readArticles = (): Article[] => {
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
  const filter = posts.filter((post) => {
    return post.frontMatter.published === true;
  });

  return filter;
};

/**
 *  ./article 内の全ての記事から topic を取得し、重複を削除した topic の新しい配列を返す。
 */
export const createTopics = (articles: Article[]): string[] => {
  const topics = articles.map((article) => article.frontMatter.topics).flat();
  const topicList = topics.filter(
    (element, index) => topics.indexOf(element) === index,
  );
  return topicList;
};

/**
 *  @param start
 *  @param end
 */
export const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

/**
 *
 */
export const createPagination = (articles: Article[], current_page: number) => {
  const PAGE_SIZE = 6;
  const sortedArticles = articles.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date)
      ? -1
      : 1,
  );
  const slicedArticles = sortedArticles.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page,
  );
  return slicedArticles;
};
