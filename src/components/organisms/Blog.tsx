import Link from 'next/link';
import BlogCard from '../atoms/BlogCard';

const Blog = () => {
  return (
    <div className="max-w-4xl md:m-auto md:my-12 m-8">
      <h1 className="text-5xl font-bold pb-8 animate-tracking-in-expand">
        BLOG
      </h1>
      <div className="grid grid-col md:grid-cols-3 gap-4">
        <BlogCard
          image={'/Cardano.png'}
          title="Cardano最新ブログ!"
          slug=""
          date="2023-01-01"
        />
        <BlogCard
          image={'/Cardano.png'}
          title="Cardano最新ブログ!"
          slug=""
          date="2023-01-01"
        />
        <BlogCard
          image={'/Cardano.png'}
          title="Cardano最新ブログ!"
          slug=""
          date="2023-01-01"
        />
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
