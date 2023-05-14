interface LayoutProps {
  children: React.ReactNode;
  blogIndex: string;
}

const BlogLayout = ({ children, blogIndex }: LayoutProps) => {
  return (
    <div className="max-w-6xl m-auto">
      <div className="lg:grid lg:grid-cols-7 lg:gap-4 p-4 lg:py-12">
        <div className="lg:col-span-5">{children}</div>
        <div className="col-span-2">
          <div className="index">
            <p className="py-4 text-center font-bold text-xl">もくじ</p>
            <div
              className="grid grid-cols-1"
              dangerouslySetInnerHTML={{ __html: blogIndex }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
