import type { Element, ElementContent } from 'hast';
import type { Paragraph, Literal, PhrasingContent, Text } from 'mdast';
import { all } from 'mdast-util-to-hast';
import type { H } from 'mdast-util-to-hast';
import type { MdastNodes } from 'mdast-util-to-hast/lib/state';
import type { Plugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import {
  isParent,
  isMessage,
  isAlert,
  isBreak,
} from '@/utils/markdownToHtml/mdast-util-test';

export interface Message extends Literal {
  type: 'message';
  children: PhrasingContent[];
}
export interface Alert extends Literal {
  type: 'alert';
  children: PhrasingContent[];
}

/**
 *
 * @param children
 * @param identifier
 */
function processFirstChild(children: Array<Node>, identifier: string) {
  const firstChild = children[0];
  const firstValue = (firstChild as Text).value;

  if (firstValue === identifier) {
    children.shift();
  } else {
    children[0] = {
      ...firstChild,
      value: firstValue.slice(identifier.length + 1),
    } as Text;
  }

  if (isBreak(children[0])) {
    children.shift();
  }
}

function processLastChild(children: Array<Node>, identifier: string) {
  const lastIndex = children.length - 1;
  const lastChild = children[lastIndex];
  const lastValue = (lastChild as Text).value;
  if (lastValue === identifier) {
    children.pop();
  } else {
    children[lastIndex] = {
      ...lastChild,
      value: lastValue.slice(0, lastValue.length - identifier.length),
    } as Text;
  }
}

/**
 *
 * @returns
 */
export const remarkMessage: Plugin = (): Transformer => {
  return (tree: Node) => {
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

      const children = [...node.children];
      processFirstChild(children, ':::message');
      processLastChild(children, ':::');

      parent.children[index] = {
        type: 'message',
        children,
      } as Message;
    };
    visit(tree, isMessage, visitor);
  };
};

export const remarkAlert: Plugin = (): Transformer => {
  return (tree: Node) => {
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

      const children = [...node.children];
      processFirstChild(children, ':::message alert');
      processLastChild(children, ':::');

      parent.children[index] = {
        type: 'alert',
        children,
      } as Alert;
    };
    visit(tree, isAlert, visitor);
  };
};

/**
 *
 * @returns
 */
export const messageHandler = (h: H, node: MdastNodes): Element => {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: 'msg',
    },
    children: [
      {
        type: 'element',
        tagName: 'p',
        properties: {
          className: 'msg-symbol',
        },
        children: [{ type: 'text', value: '!' }],
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {
          className: 'msg-content',
        },
        children: all(h, node),
      },
    ] as ElementContent[],
  };
};

/**
 *
 * @returns
 */
export const alertHandler = (h: H, node: MdastNodes): Element => {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: 'alert',
    },
    children: [
      {
        type: 'element',
        tagName: 'p',
        properties: {
          className: 'alert-symbol',
        },
        children: [{ type: 'text', value: '!' }],
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {
          className: 'msg-content',
        },
        children: all(h, node),
      },
    ] as ElementContent[],
  };
};

// export const messagePlugin: Plugin = (): Transformer => {
//   return (tree: any) => {
//     // console.log('✅' + JSON.stringify(tree, null, 2));
//     visit(tree, 'element', (node) => {
//       if (node.tagName === 'p' && node.children[0].type === 'text') {
//         if (node.children[0].value.startsWith(':::message alert')) {
//           node.tagName = 'aside';
//           node.properties = {
//             className: ['alert'],
//           };
//           const childrenLength = node.children.length;
//           const alertBlock = node.children.filter((e: any, index: number) => {
//             if (index !== 0 && index !== childrenLength - 1 && index !== 1) {
//               return e;
//             }
//           });
//           node.children = [
//             {
//               type: 'element',
//               tagName: 'span',
//               properties: { className: ['alert-symbol'] },
//               children: [{ type: 'text', value: '!' }],
//             },
//             {
//               type: 'element',
//               tagName: 'div',
//               properties: { className: ['msg-content'] },
//               children: [...alertBlock],
//             },
//           ];
//         }
//       }
//     });
//     visit(tree, 'element', (node) => {
//       if (node.tagName === 'p' && node.children[0].type === 'text') {
//         if (node.children[0].value.startsWith(':::message')) {
//           node.tagName = 'aside';
//           node.properties = {
//             className: ['message'],
//           };
//           const childrenLength = node.children.length;
//           const alertBlock = node.children.filter((e: any, index: number) => {
//             if (index !== 0 && index !== childrenLength - 1 && index !== 1) {
//               return e;
//             }
//           });
//           node.children = [
//             {
//               type: 'element',
//               tagName: 'span',
//               properties: { className: ['msg-symbol'] },
//               children: [{ type: 'text', value: '!' }],
//             },
//             {
//               type: 'element',
//               tagName: 'div',
//               properties: { className: ['msg-content'] },
//               children: [...alertBlock],
//             },
//           ];
//         }
//       }
//     });
//   };
// };
