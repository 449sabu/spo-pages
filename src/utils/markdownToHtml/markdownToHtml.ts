import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaidjs';
import remarkSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import type { Plugin } from 'unified';
import { inspect } from 'unist-util-inspect';

import {
  detailsHandler,
  remarkDetails,
  remarkNestedDetails,
} from '@/utils/markdownToHtml/detailsPlugin';
import {
  remarkLinkCard,
  linkCardHandler,
} from '@/utils/markdownToHtml/linkCardPlugin';
import {
  remarkMessage,
  messageHandler,
  alertHandler,
  remarkAlert,
} from '@/utils/markdownToHtml/messagePlugin';
import {
  remarkIndex,
  rehypeIndex,
  removeHljsClassName,
  // rehypeMessage,
} from '@/utils/markdownToHtml/unifiedPlugin';

export const print = () => {
  return (tree: Node) => {
    console.log(inspect(tree));
  };
};

export const markdownToHtml = async (markdownContent: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(print)
    .use([
      // remarkNestedDetails,
      remarkDetails,
      remarkAlert,
      remarkMessage,
      remarkLinkCard,
    ])

    .use(remarkGfm)
    .use(remarkRehype, {
      handlers: {
        linkcard: linkCardHandler,
        details: detailsHandler,
        message: messageHandler,
        alert: alertHandler,
      },
    })
    .use(remarkSlug)
    // .use(rehypeMessage)
    .use(rehypeMermaid)
    .use(rehypeHighlight, {
      detect: true,
    })
    .use(removeHljsClassName)
    .use(rehypeStringify)
    // .use([detailsPlugin, messagePlugin])
    .process(markdownContent);
  return result.toString();
};

export const markdownToIndex = async (markdown: string): Promise<string> => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkIndex)
    .use(remarkRehype)
    .use(remarkSlug)
    .use(rehypeIndex)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
};
