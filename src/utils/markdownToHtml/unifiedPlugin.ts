import type { Element, Text } from 'hast';
import type { Paragraph, Root, Content } from 'mdast';
import type { Plugin } from 'unified';
import type { Node } from 'unist';
import { inspect } from 'unist-util-inspect';
import { is } from 'unist-util-is';
import { remove } from 'unist-util-remove';
import { matches, select, selectAll } from 'unist-util-select';
import { visit } from 'unist-util-visit';
import type { VFileCompatible } from 'vfile';

export const print: Plugin = () => {
  return (tree: Node) => {
    console.log(inspect(tree));
  };
};

export const removeHljsClassName: Plugin = () => {
  return (tree: Node, _file: VFileCompatible) => {
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
      if (is<Element>(node, { tagName: 'img' })) {
        const regex = /mermaid-\d+/;
        if (regex.test(node.properties!.id as string)) {
          node.properties = {
            ...node.properties,
            className: 'mermaid-css',
          };
        }
      }
    });
  };
};

export const rehypeMessage = () => {
  return (tree: Node, _file: VFileCompatible) => {
    visit(tree, 'text', (node: Text, index: number, parent: Element) => {
      if (node.value === ':::: details detail') {
        // console.log(parent);
        parent.children = [
          // ...parent.children,
          { type: 'text', value: 'aaaaaaa' },
        ];
      }
      // console.log(node);
    });
  };
};

export const remarkIndex: Plugin = () => {
  return (tree: Node, _file: VFileCompatible) => {
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

export const rehypeIndex: Plugin = () => {
  return (tree: Node, _file: VFileCompatible) => {
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
