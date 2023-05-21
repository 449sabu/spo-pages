import { serialize } from 'next-mdx-remote/serialize';
import rehypeMermaid from 'rehype-mermaidjs';
import rehypePrettyCode from 'rehype-pretty-code';
import type { Options } from 'rehype-pretty-code';
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
  // print,
  remarkZennCode,
} from '@/utils/unified-plugin/unifiedPlugin';

export const serializer = async (source: string) => {
  const result = await serialize(source, {
    scope: {},
    mdxOptions: {
      remarkPlugins: [
        remarkZennCode,
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
        [rehypePrettyCode, rehypePrettyCodeOptions],
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

/**
 *  https://rehype-pretty-code.netlify.app/
 */
const rehypePrettyCodeOptions: Partial<Options> = {
  theme: 'one-dark-pro',
  keepBackground: false,
  // Callback hooks to add custom logic to nodes when visiting
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  // onVisitHighlightedLine(node) {
  //   node.properties.className.push("highlighted");
  // },
  // onVisitHighlightedWord(node) {
  //   node.properties.className = ["word"];
  // },
};
