import type { Element } from 'hast';
import type { Link } from 'mdast';
import type { H } from 'mdast-util-to-hast';
import type { Plugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import type { VFileCompatible } from 'vfile';
import {
  isParent,
  isEmbedYoutube,
} from '@/utils/unified-plugin/mdast-util-test';

export interface EmbedYoutube {
  type: 'embedYoutube';
  meta: {
    url: string;
    id: string;
  };
}

export const remarkEmbedYoutube: Plugin = (): Transformer => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (tree: Node, _file: VFileCompatible) => {
    const visiter = (node: Link, index: number, parent: Parent | undefined) => {
      if (!isParent(parent)) {
        return;
      }
      if (parent.type === 'listItem') {
        return;
      }
      const regex = /[?&]v=([^&]+)/;
      const match = node.url.match(regex);
      if (match) {
        const videoId = match[1];
        // console.log('✅' + videoId);
        parent.children[index] = {
          type: 'embedYoutube',
          meta: {
            url: node.url,
            id: videoId,
          },
        } as EmbedYoutube;
      }
      return;
    };
    visit(tree, isEmbedYoutube, visiter);
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const embedYoutubeHandler = (_h: H, node: EmbedYoutube): Element => {
  return {
    type: 'element' as const,
    tagName: 'youtube',
    properties: {
      url: node.meta.url,
      id: node.meta.id,
    },
    children: [],
  };
};
