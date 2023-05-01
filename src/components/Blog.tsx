import Link from 'next/link';
import BlogCard from './BlogCard';

const Blog = () => {
  const image =
    'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';
  const title = 'Cardano最新ブログ！';
  return (
    <div className="max-w-4xl md:m-auto md:my-12 m-8">
      <h1 className="text-5xl font-bold pb-8 animate-tracking-in-expand">
        BLOG
      </h1>
      <div className="grid grid-col md:grid-cols-3 gap-4">
        <BlogCard image={image} title={title} />
        <BlogCard image={image} title={title} />
        <BlogCard image={image} title={title} />
      </div>
      <Link
        href="/blog/page/1"
        className="block text-center p-8 text-lg font-medium text-blue-600"
      >
        記事一覧をみる
      </Link>
    </div>
  );
};

export default Blog;
