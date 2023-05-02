interface LayoutProps {
  children: React.ReactNode;
}

const BlogLayout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-6xl m-auto">
      <div className="lg:grid lg:grid-cols-7 lg:gap-4 p-4 lg:py-12">
        <div className="lg:col-span-5">{children}</div>
        <div className="col-span-2 border border-gray-500"></div>
      </div>
    </div>
  );
};

export default BlogLayout;
