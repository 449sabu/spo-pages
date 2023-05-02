import SocialMediaList from '../modecules/SocialMediaList';

type Props = {
  footer_data: SiteConfig['footer'];
  poolInformation: PoolInformation;
  exMetadata?: ExtendedMetadata;
};

const Footer = ({ footer_data, poolInformation, exMetadata }: Props) => {
  const links = [
    {
      url: `https://cexplorer.io/pool/${poolInformation.pool_id_bech32}`,
      name: 'cexplorer.io',
    },
    {
      url: `https://pooltool.io/pool/${poolInformation.pool_id_hex}/epochs`,
      name: 'pooltool.io',
    },
    {
      url: `https://pool.pm/${poolInformation.pool_id_hex}`,
      name: 'pool.pm',
    },
    {
      url: `https://poolpeek.com/pool/${poolInformation.pool_id_hex}`,
      name: 'poolpeek.com',
    },
    {
      url: `https://cardanoscan.io/pool/${poolInformation.pool_id_bech32}`,
      name: 'cardanoscan.io',
    },
  ];

  return (
    <footer aria-label="Site Footer" className="bg-gray-100">
      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-8 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <p className="max-w-xs mt-4 text-gray-500">
              当サイトは SPO Pages で作成されています。詳しくは Docs
              をご確認ください。
            </p>
            {exMetadata?.info?.social ? (
              <SocialMediaList social={exMetadata.info.social} />
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {footer_data.map((e, i) => (
              <div key={i}>
                <p className="font-medium text-gray-900">{e.title}</p>
                <nav aria-label="Footer Navigation - Services" className="mt-6">
                  <ul className="space-y-4 text-sm">
                    {e.data.map((e, i) => (
                      <li key={i}>
                        <a
                          href={e.url}
                          className="text-gray-700 transition hover:opacity-75"
                        >
                          {e.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
            <div>
              <p className="font-medium text-gray-900">Explorer</p>
              <nav aria-label="Footer Navigation - Services" className="mt-6">
                <ul className="space-y-4 text-sm">
                  {links.map((e, i) => (
                    <li key={i}>
                      <a
                        href={e.url}
                        target="_blank"
                        className="text-gray-700 transition hover:opacity-75"
                        rel="noreferrer"
                      >
                        {e.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <p className="text- text-gray-500">
          &copy;{' '}
          {`${new Date().getFullYear()} ${poolInformation.meta_json.name}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
