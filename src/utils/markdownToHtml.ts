import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { customCode, transformer } from '@/utils/costomeCode';

export const markdownToHtml = async (markdownContent: string) => {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(rehypeHighlight, {
      detect: true,
    })
    // .use(rehypeSanitize, {
    //   ...defaultSchema,
    //   attributes: {
    //     ...defaultSchema.attributes,
    //     code: [
    //       ...(defaultSchema.attributes?.code || []),
    //       // List of all allowed languages:
    //       ['className', 'language-js', 'language-css', 'language-md'],
    //     ],
    //     span: [
    //       ...(defaultSchema.attributes?.span || []),
    //       // List of all allowed tokens:
    //       [
    //         'className',
    //         'hljs-addition',
    //         'hljs-attr',
    //         'hljs-attribute',
    //         'hljs-built_in',
    //         'hljs-bullet',
    //         'hljs-char',
    //         'hljs-code',
    //         'hljs-comment',
    //         'hljs-deletion',
    //         'hljs-doctag',
    //         'hljs-emphasis',
    //         'hljs-formula',
    //         'hljs-keyword',
    //         'hljs-link',
    //         'hljs-literal',
    //         'hljs-meta',
    //         'hljs-name',
    //         'hljs-number',
    //         'hljs-operator',
    //         'hljs-params',
    //         'hljs-property',
    //         'hljs-punctuation',
    //         'hljs-quote',
    //         'hljs-regexp',
    //         'hljs-section',
    //         'hljs-selector-attr',
    //         'hljs-selector-class',
    //         'hljs-selector-id',
    //         'hljs-selector-pseudo',
    //         'hljs-selector-tag',
    //         'hljs-string',
    //         'hljs-strong',
    //         'hljs-subst',
    //         'hljs-symbol',
    //         'hljs-tag',
    //         'hljs-template-tag',
    //         'hljs-template-variable',
    //         'hljs-title',
    //         'hljs-type',
    //         'hljs-variable',
    //       ],
    //     ],
    //   },
    // })
    .use(rehypeStringify)
    .use(customCode)
    // .use(transformer)
    .process(markdownContent);
  return result.toString();
};
