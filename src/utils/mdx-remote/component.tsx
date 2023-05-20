import type { MDXComponents } from 'mdx/types';
import type { DetailsProps } from '@/components/atoms/Details';
import Details from '@/components/atoms/Details';
import type { MessageProps } from '@/components/atoms/MessageAlert';
import MessageAlert from '@/components/atoms/MessageAlert';
import type { LinkCardProps } from '@/components/organisms/LinkCard';

import LinkCard from '@/components/organisms/LinkCard';

type ProvidedComponents = MDXComponents & {
  // a: typeof NextLink;
  // img: typeof NextImage;
  linkcard: typeof LinkCard;
  message: typeof MessageAlert;
  alert: typeof MessageAlert;
  details: typeof Details;
};

const replaceComponents = {
  // a: (props: NextLinkProps) => <NextLink {...props} />,
  // img: (props: NextImageProps) => <NextImage {...props} />,
  linkcard: (props: LinkCardProps) => <LinkCard {...props} />,
  message: (props: MessageProps) => <MessageAlert {...props} />,
  alert: (props: MessageProps) => <MessageAlert {...props} />,
  details: (props: DetailsProps) => <Details {...props} />,
} as ProvidedComponents;

export default replaceComponents;
