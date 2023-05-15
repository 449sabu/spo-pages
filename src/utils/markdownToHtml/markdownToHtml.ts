import rehypeHighlight from 'rehype-highlight';
import rehypeMermaid from 'rehype-mermaidjs';
import remarkSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { detailsPlugin } from './detailsPlugin';
// import { linkCardPlugin } from './linkCardPlugin';
// import { remarkMermaid, rehypeMermaid } from "./mermaidPlugin";
import { messagePlugin } from '@/utils/markdownToHtml/messagePlugin';
import {
  remarkIndex,
  rehypeIndex,
  removeHljsClassName,
  print,
  rehypeMessage,
} from '@/utils/markdownToHtml/unifiedPlugin';

export const markdownToHtml = async (markdownContent: string) => {
  const result = await unified()
    // .use(print)
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(remarkSlug)
    // .use(rehypeMessage)
    .use(rehypeMermaid, {
      // strategy: 'img-svg',
    })
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
