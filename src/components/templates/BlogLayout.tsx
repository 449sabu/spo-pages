import Link from 'next/link';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';

interface LayoutProps {
  children: React.ReactNode;
  blog_index: MDXRemoteSerializeResult;
  topic_list: string[];
}

const BlogLayout = ({ children, blog_index, topic_list }: LayoutProps) => {
  return (
    <div className="max-w-6xl m-auto">
      <div className="lg:grid lg:grid-cols-7 lg:gap-4 py-4 mg:p-4 lg:py-12">
        <div className="lg:col-span-5">{children}</div>
        <div className="col-span-2">
          <div className="index">
            <div className="flex py-4 font-bold text-xl justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              <p>カテゴリー</p>
            </div>
            {topic_list.map((element, index) => (
              <Link
                href={`/blog/topics/${element}`}
                key={index}
                className="block text-lg border-b-2 p-2 hover:text-blue-400"
              >
                {element}
              </Link>
            ))}
          </div>
          <div className="index">
            <div className="flex py-4 font-bold text-xl justify-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
              <p>もくじ</p>
            </div>
            <div className="grid grid-cols-1">
              <MDXRemote {...blog_index} />
            </div>
            {/* <div
              className="grid grid-cols-1"
              dangerouslySetInnerHTML={{ __html: blog_index }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
