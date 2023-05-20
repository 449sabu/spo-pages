import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaidjs';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import {
  messageHandler,
  remarkMessage,
  remarkAlert,
  alertHandler,
} from '../unified-plugin/messagePlugin';
import {
  detailsHandler,
  remarkDetails,
} from '@/utils/unified-plugin/detailsPlugin';
import {
  remarkLinkCard,
  linkCardHandler,
} from '@/utils/unified-plugin/linkCardPlugin';
import {
  removeHljsClassName,
  print,
} from '@/utils/unified-plugin/unifiedPlugin';

export const serializer = async (source: string) => {
  const result = await serialize(source, {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
        print,
        remarkBreaks,
        remarkDetails,
        remarkAlert,
        remarkMessage,
        remarkLinkCard,
        remarkGfm,
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeMermaid,
          {
            strategy: 'inline-svg',
            mermaidConfig: {
              fontFamily: 'sans-serif, monospace',
            },
          },
        ],
        [
          rehypeHighlight,
          {
            detect: true,
          },
        ],
        removeHljsClassName,
      ],
      remarkRehypeOptions: {
        handlers: {
          linkCard: linkCardHandler,
          message: messageHandler,
          alert: alertHandler,
          details: detailsHandler,
        },
      },
      format: 'mdx',
    },
    parseFrontmatter: true,
  });

  return result;
};
