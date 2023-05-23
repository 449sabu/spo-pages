import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import {
  // print,
  rehypeIndex,
  remarkIndex,
} from '@/utils/unified-plugin/unifiedPlugin';

export const indexSerializer = async (source: string) => {
  const content = await serialize(source, {
    scope: {},
    mdxOptions: {
      remarkPlugins: [remarkBreaks, remarkIndex],
      rehypePlugins: [rehypeSlug, rehypeIndex],
      format: 'mdx',
    },
    parseFrontmatter: true,
  });
  return content;
};
