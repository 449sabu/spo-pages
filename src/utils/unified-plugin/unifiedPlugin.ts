import type { Element } from 'hast';
import type { Paragraph, Code, Parent } from 'mdast';
import type { Plugin, Transformer } from 'unified';
import type { Node } from 'unist';
import { inspect } from 'unist-util-inspect';
import { is } from 'unist-util-is';
import { remove } from 'unist-util-remove';
import { visit } from 'unist-util-visit';
import { isParent, isCode } from '@/utils/unified-plugin/mdast-util-test';

export const print = () => {
  return (tree: Node) => {
    console.log(inspect(tree));
  };
};

export const removeHljsClassName: Plugin = () => {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {
      if (is<Element>(node, { tagName: 'code' })) {
        if (node.properties!.className as string[]) {
          const hljsLanguage = node.properties!.className as Array<string>;
          node.properties = {
            className: hljsLanguage[1],
          };
        }
      }
    });
    visit(tree, 'element', (node: Element) => {
      if (is<Element>(node, { tagName: 'svg' })) {
        const regex = /mermaid-\d+/;
        if (regex.test(node.properties!.id as string)) {
          node.properties = {
            ...node.properties,
            className: 'mermaid-style',
          };
        }
      }
    });
  };
};

export const remarkZennCode: Plugin = (): Transformer => {
  return (tree: Node) => {
    const visitor = (node: Code) => {
      if (node.meta) {
        const regex = /:(.*)/;
        const match = node.meta.match(regex);
        if (match) {
          node.meta = `title="${match[1]}"`;
        }
      }
    };
    visit(tree, isCode, visitor);
  };
};

/**
 * インデックスプラグイン１
 * @returns
 */
export const remarkIndex: Plugin = () => {
  return (tree: Node) => {
    remove(tree, (node) => {
      return (
        node.type === 'code' ||
        node.type === 'list' ||
        node.type === 'paragraph' ||
        node.type === 'thematicBreak'
      );
    });
  };
};

/**
 * インデックスプラグイン２
 * @returns
 */
export const rehypeIndex: Plugin = () => {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {
      if (is<Element>(node, { tagName: 'h1' })) {
        node.tagName = 'a';
        node.properties = {
          href: `#${node.properties!.id}`,
          className: 'index-h1',
        };
      }
      if (is<Element>(node, { tagName: 'h2' })) {
        node.tagName = 'a';
        node.properties = {
          href: `#${node.properties!.id}`,
          className: 'index-h2',
        };
      }
      if (is<Element>(node, { tagName: 'h3' })) {
        node.tagName = 'a';
        node.properties = {
          href: `#${node.properties!.id}`,
          className: 'index-h3',
        };
      }
      if (is<Element>(node, { tagName: 'h4' })) {
        node.tagName = 'a';
        node.properties = {
          href: `#${node.properties!.id}`,
          className: 'index-h4',
        };
      }
    });
  };
};
