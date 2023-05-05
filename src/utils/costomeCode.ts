import { visit } from 'unist-util-visit';

export const customCode = () => {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'p' && node.children[0].type === 'text') {
        if (node.children[0].value.startsWith(':::message alert')) {
          node.tagName = 'aside';
          node.properties = {
            className: ['message'],
          };
          const value = node.children[3].value.replace(
            /:::message\s+(.*?)\s*:::/gs,
            '$1',
          );
          const a = node.children.map((e: any) => {
            console.log(e);
            if (e.type === 'text') {
              return {
                type: 'element',
                tagName: 'div',
                properties: { className: [''] },
                children: [{ type: 'text', value: e.value }],
              };
            }
            return {
              type: 'element',
              tagName: 'br',
              properties: { className: [''] },
              children: [{ type: 'text', value: '' }],
            };
          });
          // console.log(a);

          node.children = [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['msg-symbol'] },
              children: [{ type: 'text', value: '!' }],
            },
            {
              type: 'element',
              tagName: 'p',
              properties: { className: [''] },
              children: [{ type: 'text', value }],
            },
            ...a,
          ];
        }
      }
    });
  };
};

export const transformer = () => {
  return (tree: any) => {
    visit(tree, 'text', (node, index, parent) => {
      const match = node.value.match(/:::message\s+(.*?)\s*:::/gs);
      if (match) {
        const html = match[0].replace(
          /:::message\s+(.*?)\s*:::/gs,
          '<aside class="msg"><span class="msg-symbol">!</span><div class="msg-content"><p>$1</p></div></aside>',
        );
        // parent.children.splice(index, 1, ...htmlParser(html).children);
      }
    });
  };
};
