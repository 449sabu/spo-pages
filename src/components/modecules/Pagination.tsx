import Link from 'next/link';

type Props = {
  pages: number[];
  current_page: number;
};

const Pagination = ({ pages, current_page }: Props) => {
  return (
    <div className="inline-flex items-center justify-center gap-3">
      {current_page === 1 ? null : (
        <Link
          href={`/blog/page/${current_page - 1}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 rtl:rotate-180 hover:bg-blue-500 hover:text-white"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}

      <p className="text-xs text-gray-900">
        {current_page}
        <span className="mx-2">/</span>
        {pages.length}
      </p>

      {pages.length === current_page ? null : (
        <Link
          href={`/blog/page/${current_page + 1}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-200 rtl:rotate-180 hover:bg-blue-500 hover:text-white"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
