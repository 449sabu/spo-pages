import type { Element, ElementContent } from 'hast';
import type { Paragraph, Link, Literal } from 'mdast';
import type { H } from 'mdast-util-to-hast';
import type { Plugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import type { VFileCompatible } from 'vfile';
import { getOgpData } from '@/utils/getOgpData';
import { isParent, isLinkCard } from '@/utils/markdownToHtml/mdast-util-test';

interface linkCard extends Literal {
  type: 'linkcard';
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

      promises.push(async () => {
        const data = await getOgpData(child.url);
        parent.children[index] = {
          type: 'linkcard',
          meta: data,
        } as linkCard;
      });
    };

    visit(tree, isLinkCard, visitor);
    await Promise.all(promises.map((t) => t()));
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const linkCardHandler = (_h: H, node: linkCard): Element => {
  return {
    type: 'element' as const,
    tagName: 'a',
    properties: {
      href: node.meta.url,
      target: '_blank',
    },
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: {
          className: 'link-card',
        },
        children: [
          // text
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'link-card-text',
            },
            children: [
              // title
              {
                type: 'element',
                tagName: 'p',
                properties: {
                  className: 'link-card-title',
                },
                children: [
                  {
                    type: 'text',
                    value: node.meta.title,
                  },
                ],
              },
              // url
              {
                type: 'element',
                tagName: 'span',
                properties: {
                  className: 'link-card-url',
                },
                children: [
                  {
                    type: 'text',
                    value: node.meta.url,
                  },
                ],
              },
            ],
          },
          // image
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'link-card-img',
            },
            children: [
              {
                type: 'element',
                tagName: 'img',
                properties: {
                  src: node.meta.og,
                  className: 'object-cover',
                },
              },
            ],
          },
        ],
      },
    ] as ElementContent[],
  };
};
