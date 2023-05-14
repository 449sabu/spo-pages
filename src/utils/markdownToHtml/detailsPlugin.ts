import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const detailsPlugin: Plugin = () => {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'p' && node.children[0].type === 'text') {
        if (node.children[0].value.startsWith(':::details')) {
          const regex = /:::details\s+(.*)/i;
          const title = node.children[0].value.match(regex);
          const childrenLength = node.children.length;
          const alertBlock = node.children.filter((e: any, index: number) => {
            if (index !== 0 && index !== childrenLength - 1 && index !== 1) {
              return e;
            }
          });
          node.tagName = 'details';
          node.properties = {
            className: ['details'],
          };
          node.children = [
            {
              type: 'element',
              tagName: 'summary',
              properties: { className: [''] },
              children: [{ type: 'text', value: title[1] }],
            },
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['details-content'] },
              children: [...alertBlock],
            },
          ];
        }
      }
      if (node.tagName === 'p' && node.children[0].type === 'text') {
        if (node.children[0].value.startsWith('::::details')) {
          const regex = /::::details\s+(.*)/i;
          const title = node.children[0].value.match(regex);
          const childrenLength = node.children.length;
          const alertBlock = node.children.filter((e: any, index: number) => {
            // if (index !== 0 && index !== childrenLength - 1 && index !== 1) {
            // 	return e;
            // }
            if (e.type === 'text' && e.value === ':::message') {
              return e;
            }
            if (e.type === 'text' && e.value === ':::') {
              return e;
            }
          });

          // console.log("details✅" + JSON.stringify(node.children, null,2))
          // console.log(alertBlock)

          node.tagName = 'details';
          node.properties = {
            className: ['details'],
          };
          node.children = [
            {
              type: 'element',
              tagName: 'summary',
              properties: { className: [''] },
              children: [{ type: 'text', value: title[1] }],
            },
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['details-content'] },
              children: [
                {
                  type: 'element',
                  tagName: 'p',
                  children: [
                    {
                      type: 'text',
                      value: ':::message',
                    },
                    {
                      type: 'element',
                      tagName: 'br',
                      properties: {},
                      children: [],
                    },
                    {
                      type: 'text',
                      value: '\n',
                    },
                    {
                      type: 'text',
                      value: '警告メッセージをここに',
                    },
                    {
                      type: 'element',
                      tagName: 'br',
                      properties: {},
                      children: [],
                    },
                    {
                      type: 'text',
                      value: '\n',
                    },
                    {
                      type: 'text',
                      value: ':::',
                    },
                  ],
                },
                // ...node.children
                // ...alertBlock
              ],
            },
          ];
        }
      }
    });
  };
};
