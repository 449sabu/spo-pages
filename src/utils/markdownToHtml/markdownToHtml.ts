import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaidjs';
import remarkSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import {
  detailsHandler,
  remarkDetails,
} from '@/utils/unified-plugin/detailsPlugin';
import {
  remarkLinkCard,
  linkCardHandler,
} from '@/utils/unified-plugin/linkCardPlugin';
import {
  remarkMessage,
  messageHandler,
  alertHandler,
  remarkAlert,
} from '@/utils/unified-plugin/messagePlugin';
import {
  remarkIndex,
  rehypeIndex,
  removeHljsClassName,
  // print
} from '@/utils/unified-plugin/unifiedPlugin';

export const markdownToHtml = async (markdownContent: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkBreaks)
    // .use(print)
    .use([remarkDetails, remarkAlert, remarkMessage, remarkLinkCard])
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
    .use(rehypeMermaid)
    .use(rehypeHighlight, {
      detect: true,
    })
    .use(removeHljsClassName)
    .use(rehypeStringify)
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
