import type { Element } from 'hast';
import type { Paragraph, Literal, PhrasingContent, Text } from 'mdast';
import type { H } from 'mdast-util-to-hast';
import { all } from 'mdast-util-to-hast';
import type { MdastNodes } from 'mdast-util-to-hast/lib/state';
import type { Plugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';
import type { VFileCompatible } from 'vfile';
import {
  isParent,
  isParagraph,
  isBreak,
  isText,
} from '@/utils/unified-plugin/mdast-util-test';

export interface Details extends Literal {
  type: 'details';
  title: string;
  children: PhrasingContent[];
}

export function processFirstChild(children: Array<Node>) {
  const firstChild = children[0];
  const regex = /:::details\s(.*)/;
  const match = (children[0] as Text).value.match(regex);

  if (match) {
    {
      children[0] = {
        ...firstChild,
        value: match[2],
      } as PhrasingContent;
    }
    if (isBreak(children[1])) {
      children.shift();
    }
  }
}

export function processLastChild(children: Array<Node>, identifier: string) {
  const lastIndex = children.length - 1;
  const lastChild = children[lastIndex];
  const lastValue = (lastChild as Text).value;
  if (lastValue === identifier) {
    children.pop();
  } else {
    children[lastIndex] = {
      ...lastChild,
      value: lastValue.slice(0, lastValue.length - identifier.length),
    } as PhrasingContent;
  }
}

/**
 *
 * @param children
 */
const processMessageSearchChild = (children: Array<Node>) => {
  function firstMessage(children: Array<Node>, identifier: string) {
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
  }
  function lastMessage(children: Array<Node>, identifier: string) {
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

  console.log(children);
  firstMessage(children, ':::message');
  lastMessage(children, ':::\n');
};

/**
 *
 * @returns
 */
export const remarkDetails: Plugin = (): Transformer => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (tree: Node, _file: VFileCompatible) => {
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

      if (isText(node.children[0])) {
        const regex = /:::details\s(.*)/;
        const match = (node.children[0] as Text).value.match(regex);
        if (match) {
          const detailTitle = match[1];
          const children = [...node.children];

          children.shift();
          if (isBreak(children[0])) {
            children.shift();
          }
          processLastChild(children, ':::');

          parent.children[index] = {
            type: 'details',
            title: detailTitle,
            children,
          } as Details;
        }
      } else {
        return;
      }
    };
    visit(tree, isParagraph, visitor);
  };
};

// export const remarkNestedDetails: Plugin = (): Transformer => {
// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	return async (tree: Node, _file: VFileCompatible) => {
// 		const promises: (() => Promise<void>)[] = [];
// 		const visitor = (
// 			node: Paragraph,
// 			index: number,
// 			parent: Parent | undefined
// 		) => {
// 			if (!isParent(parent)) {
// 				return;
// 			}
// 			if (parent.type === "listItem") {
// 				return;
// 			}

// 			const nestedDetailsRegex = /::::details\s+(.*?)\n([\s\S]*)/gs;
// 			const matchNestedDetails = nestedDetailsRegex.exec(
// 				(node.children[0] as Text).value
// 			);

// 			if (matchNestedDetails) {
// 				const title = matchNestedDetails[1];

// 				const children = [...node.children];
// 				processFirstChild(children);
// 				processLastChild(children, "::::");
// 				processMessageSearchChild(children);

// 				promises.push(async () => {
// 					parent.children[index] = {
// 						type: "details",
// 						title,
// 						children,
// 					} as Details;
// 				});
// 			} else {
// 				return;
// 			}
// 		};
// 		visit(tree, isParagraph, visitor);
// 		await Promise.all(promises.map((t) => t()));
// 	};
// };

export const detailsHandler = (h: H, node: unknown): Element => {
  return {
    type: 'element' as const,
    tagName: 'details',
    properties: {
      title: (node as Details).title,
    },
    children: all(h, node as MdastNodes),
  };
};
