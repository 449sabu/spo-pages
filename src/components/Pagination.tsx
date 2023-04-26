import Link from 'next/link';

type Props = {
  pages: number[];
  current_page: number;
};

const Pagination = ({ pages, current_page }: Props) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none my-6 flex justify-center">
        {/* <li>
					<a className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">
						Previous
					</a>
				</li> */}
        {pages.map((e, i) => (
          <li key={i}>
            <Link
              href={`/blog/page/${e}`}
              className={`m-1 relative block rounded px-3 py-1.5 text-lg font-medium transition-all duration-300 hover:bg-success-100 ${
                current_page == e && ' bg-success-100  text-success-700'
              }`}
            >
              {e}
            </Link>
          </li>
        ))}
        {/* <li>
					<a
						className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
						href="#!"
					>
						Next
					</a>
				</li> */}
      </ul>
    </nav>
  );
};

export default Pagination;
