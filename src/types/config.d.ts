interface SiteConfig {
  blog: {
    enable: boolean;
    title: string;
    description: string;
  };
  footer: {
    title: string;
    data: {
      name: string;
      url: string;
    }[];
  }[];
}

type ArticleConfig = {
  title: string;
  date: string;
  description: string | null;
  tag: string[];
  topics: string[] | null;
  published: boolean;
  published_at: Date | null;
  image: string;
};

type FrontMatter = {
  [key: string]: any;
};

type AllArticles = {
  frontMatter: FrontMatter;
  slug: string;
};
