import Link from 'next/link';
import Card from './Card';

const Blog = () => {
  const bgColor = 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400';

  return (
    <div className="max-w-4xl md:m-auto md:my-12 m-8">
      <h1 className="text-5xl font-bold pb-8 animate-tracking-in-expand">
        BLOG
      </h1>
      <div className="grid grid-col md:grid-cols-3 gap-4">
        <Card />
        <Card />
        <Card />
      </div>
      <Link
        href="/blog"
        className="block text-center p-8 text-lg font-medium text-blue-600"
      >
        記事一覧をみる
      </Link>
    </div>
  );
};

export default Blog;
