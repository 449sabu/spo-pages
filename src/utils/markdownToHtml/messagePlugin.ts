import type { Plugin, Transformer } from 'unified';
import { visit } from 'unist-util-visit';

export const messagePlugin: Plugin = (): Transformer => {
  return (tree: any) => {
    // console.log('✅' + JSON.stringify(tree, null, 2));
    visit(tree, 'element', (node) => {
      if (node.tagName === 'p' && node.children[0].type === 'text') {
        if (node.children[0].value.startsWith(':::message alert')) {
          node.tagName = 'aside';
          node.properties = {
            className: ['alert'],
          };
          const childrenLength = node.children.length;
          const alertBlock = node.children.filter((e: any, index: number) => {
            if (index !== 0 && index !== childrenLength - 1 && index !== 1) {
              return e;
            }
          });
          node.children = [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['alert-symbol'] },
              children: [{ type: 'text', value: '!' }],
            },
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['msg-content'] },
              children: [...alertBlock],
            },
          ];
        }
      }
    });
    visit(tree, 'element', (node) => {
      if (node.tagName === 'p' && node.children[0].type === 'text') {
        if (node.children[0].value.startsWith(':::message')) {
          node.tagName = 'aside';
          node.properties = {
            className: ['message'],
          };
          const childrenLength = node.children.length;
          const alertBlock = node.children.filter((e: any, index: number) => {
            if (index !== 0 && index !== childrenLength - 1 && index !== 1) {
              return e;
            }
          });
          node.children = [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['msg-symbol'] },
              children: [{ type: 'text', value: '!' }],
            },
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['msg-content'] },
              children: [...alertBlock],
            },
          ];
        }
      }
    });
  };
};
