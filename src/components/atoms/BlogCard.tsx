import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/atoms/Badge';

type Props = {
  image: string;
  title: string;
  date: string;
  slug: string;
  topics?: string[];
};

const BlogCard = ({ image, title, slug, date, topics }: Props) => {
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
          {date}
        </p>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex">
          {topics
            ? topics.map((topic, index) => (
                <Link
                  href={`/blog/topics/${topic}`}
                  key={index}
                  className="py-2 pr-2"
                >
                  <Badge text={topic} />
                </Link>
              ))
            : null}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
