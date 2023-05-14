import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const remarkMermaid: Plugin = () => {
  return (tree: any) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'mermaid') {
        (node.type = 'paragraph'),
          (node.children = [
            {
              type: 'text',
              value: 'mermaid',
            },
            {
              type: 'text',
              value: node.value,
            },
          ]);
      }
    });
  };
};

export const rehypeMermaid: Plugin = () => {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'p' && node.children[0].value === 'mermaid') {
        const mermaidContent = node.children.filter((e: any, index: number) => {
          if (index !== 0 && e.type === 'text') {
            return e;
          }
        });
        node.tagName = 'pre';
        node.properties = {
          className: ['mermaid mermaid-css'],
          id: ['a'],
        };
        node.children = [...mermaidContent];
      }
    });
  };
};
