import { DefaultSeo } from 'next-seo';

type Props = {
  poolInformation: PoolInformation;
};

const Seo = ({ poolInformation }: Props) => {
  return (
    <DefaultSeo
      defaultTitle={poolInformation.meta_json.name}
      description={poolInformation.meta_json.description}
      openGraph={{
        type: 'website',
        title: poolInformation.meta_json.name,
        description: poolInformation.meta_json.description,
        site_name: poolInformation.meta_json.name,
        url: `https://${process.env.VERCEL_URL}`,
        images: [
          {
            url: 'https://www.example.ie/og-image-01.jpg',
            width: 1200,
            height: 630,
            alt: 'Og Image Alt',
            type: 'image/jpeg',
          },
        ],
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  );
};

export default Seo;
