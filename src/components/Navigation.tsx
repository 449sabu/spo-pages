import Link from 'next/link';

const Navigation = () => {
  return (
    <div className="max-h-20">
      <div className="max-w-4xl m-auto flex justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Pool Name
        </Link>
        <div>
          <Link href="/" className="text-xl font-bold p-4">
            Blog
          </Link>
          <Link href="/" className="text-xl font-bold p-4">
            Explorer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
