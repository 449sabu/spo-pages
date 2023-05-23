import ArticleIcon from '../atoms/svgs/ArticleIcon';

export interface LinkCardProps {
  url: string;
  title: string;
  description: string;
  og: string | undefined;
  // icon: string | undefined;
}

const LinkCard: React.FC<LinkCardProps> = (props) => {
  const { url, title, description, og } = props;

  return (
    <div className="my-4 h-[105px] max-w-xl transition m-auto">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <span className="my-4 flex h-full w-full overflow-hidden rounded-md border-2 border-solid">
          <span className="flex shrink grow-[4] basis-44 flex-col overflow-hidden p-4">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-gray-950">
              {title}
            </span>
            <span className="min-h-[2em] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-950">
              {description}
            </span>
            <span className="flex h-5 items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-950">
              {url.indexOf('/', 8) != -1
                ? url.slice(8, url.indexOf('/', 8))
                : url.slice(8)}
            </span>
          </span>
          <span className="flex max-w-[200px] shrink-[6] grow basis-44">
            {og ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={og}
                width={1200}
                height={630}
                alt="og image"
                loading="lazy"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-[color:var(--shadow)] fill-[color:var(--fg)]">
                <ArticleIcon className="h-8 w-8" />
              </span>
            )}
          </span>
        </span>
      </a>
    </div>
  );
};

export default LinkCard;
