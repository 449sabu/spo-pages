import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaidjs';
import remarkSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
// import type { Plugin } from 'unified';
// import { inspect } from 'unist-util-inspect';

import { detailsPlugin } from '@/utils/markdownToHtml/detailsPlugin';
import {
  remarkLinkCard,
  linkCardHandler,
} from '@/utils/markdownToHtml/linkCardPlugin';
import { messagePlugin } from '@/utils/markdownToHtml/messagePlugin';
import {
  remarkIndex,
  rehypeIndex,
  removeHljsClassName,
  // rehypeMessage,
} from '@/utils/markdownToHtml/unifiedPlugin';

// export const print: Plugin = () => {
//   return (tree: Node) => {
//     console.log(inspect(tree));
//   };
// };

export const markdownToHtml = async (markdownContent: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkLinkCard)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, {
      handlers: {
        linkcard: linkCardHandler,
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
    .use([detailsPlugin, messagePlugin])
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
