import Link from 'next/link';

const Header = () => {
  return (
    <div className="max-h-20">
      <div className="max-w-4xl m-auto flex justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Cardano
        </Link>
        <div>
          <Link href="/blog/page/1" className="text-xl font-bold p-4">
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
