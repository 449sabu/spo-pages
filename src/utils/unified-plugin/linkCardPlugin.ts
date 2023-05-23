import type { Element } from 'hast';
import type { Paragraph, Link, Literal } from 'mdast';
import type { H } from 'mdast-util-to-hast';
import type { Plugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import type { VFileCompatible } from 'vfile';
import { getOgpData } from '@/utils/getOgpData';
import {
  isParent,
  isLinkCard,
  isEmbedYoutube,
} from '@/utils/unified-plugin/mdast-util-test';

export interface LinkCard extends Literal {
  type: 'linkCard';
  meta: {
    url: string;
    title: string;
    description: string;
    og: string | undefined;
    icon: string | undefined;
  };
}

export const remarkLinkCard: Plugin = (): Transformer => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (tree: Node, _file: VFileCompatible) => {
    const promises: (() => Promise<void>)[] = [];
    const visitor = (
      node: Paragraph,
      index: number,
      parent: Parent | undefined,
    ) => {
      if (!isParent(parent)) {
        return;
      }
      if (parent.type === 'listItem') {
        return;
      }
      const child = node.children[0] as Link;

      if (isEmbedYoutube(node.children[0])) {
        return;
      }

      promises.push(async () => {
        const data = await getOgpData(child.url);
        parent.children[index] = {
          type: 'linkCard',
          meta: data,
        } as LinkCard;
      });
    };

    visit(tree, isLinkCard, visitor);
    await Promise.all(promises.map((t) => t()));
  };
};

export const linkCardHandler = (_h: H, node: LinkCard): Element => {
  return {
    type: 'element' as const,
    tagName: 'linkcard',
    properties: {
      url: node.meta.url,
      title: node.meta.title,
      description: node.meta.description,
      og: node.meta.og,
      // icon: node.meta.icon,
    },
    children: [],
  };
};
