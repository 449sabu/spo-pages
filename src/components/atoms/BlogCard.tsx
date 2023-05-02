import Image from 'next/image';
import Link from 'next/link';

type Props = {
  image: string;
  title: string;
  slug: string;
};
const BlogCard = ({ image, title, slug }: Props) => {
  return (
    <Link href={`/blog/${slug}`}>
      <Image
        alt="Blog Image"
        width={1200}
        height={630}
        src={image}
        className="w-full rounded-xl object-cover shadow-xl"
      />
      <div className="p-4">
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          2023-05-01
        </p>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
    </Link>
  );
};

export default BlogCard;
