import type { Paragraph, Text, Link, Break, Code } from 'mdast';
import type { Node, Parent, Literal } from 'unist';

function isObject(target: unknown): target is { [key: string]: unknown } {
  return typeof target === 'object' && target !== null;
}

// https://github.com/syntax-tree/unist#node
export function isNode(node: unknown): node is Node {
  return isObject(node) && 'type' in node;
}

// https://github.com/syntax-tree/unist#parent
export function isParent(node: unknown): node is Parent {
  return isObject(node) && Array.isArray(node.children);
}

// https://github.com/syntax-tree/unist#literal
export function isLiteral(node: unknown): node is Literal {
  return isObject(node) && 'value' in node;
}

// https://github.com/syntax-tree/mdast#paragraph
export function isParagraph(node: unknown): node is Paragraph {
  return isNode(node) && node.type === 'paragraph';
}

// https://github.com/syntax-tree/mdast#text
export function isText(node: unknown): node is Text {
  return (
    isLiteral(node) && node.type === 'text' && typeof node.value === 'string'
  );
}

// https://github.com/syntax-tree/mdast#code
export function isCode(node: unknown): node is Code {
  return isLiteral(node) && node.type === 'code';
}

export function isLink(node: unknown): node is Link {
  return isNode(node) && node.type === 'link';
}

// https://github.com/syntax-tree/mdast#break
export const isBreak = (node: unknown): node is Break => {
  return isNode(node) && node.type === 'break';
};

export const isMessage = (node: unknown): node is Paragraph => {
  if (!isParagraph(node)) {
    return false;
  }

  const { children } = node;
  const firstChild = children[0];
  if (!(isText(firstChild) && firstChild.value.startsWith(':::message'))) {
    return false;
  }

  const lastChild = children[children.length - 1];
  if (!(isText(lastChild) && lastChild.value.endsWith(':::'))) {
    return false;
  }

  return true;
};

export const isAlert = (node: unknown): node is Paragraph => {
  if (!isParagraph(node)) {
    return false;
  }

  const { children } = node;
  const firstChild = children[0];

  if (
    !(isText(firstChild) && firstChild.value.startsWith(':::message alert'))
  ) {
    return false;
  }

  const lastChild = children[children.length - 1];
  if (!(isText(lastChild) && lastChild.value.endsWith(':::'))) {
    return false;
  }

  return true;
};

/**
 *
 * @param node
 * @returns
 */
export const isDetails = (node: unknown): node is Paragraph => {
  if (!isParagraph(node)) {
    return false;
  }

  const { children } = node;
  const firstChild = children[0];

  if (!(isText(firstChild) && firstChild.value.startsWith(':::details'))) {
    return false;
  }
  const lastChild = children[children.length - 1];
  if (!(isText(lastChild) && lastChild.value.endsWith(':::'))) {
    return false;
  }

  return true;
};

/**
 * ベタ張りのURL
 * @param node
 * @returns
 */
export const isLinkCard = (node: unknown): node is Paragraph => {
  if (!isParagraph(node)) {
    return false;
  }
  const { children } = node;
  if (children.length != 1) {
    return false;
  }
  const singleChild = children[0];

  if (
    !(
      isLink(singleChild) &&
      singleChild.children[0].type == 'text' &&
      singleChild.url.startsWith('http') &&
      (singleChild.children[0] as Text).value.startsWith('http')
    )
  ) {
    return false;
  }

  return true;
};

export const isEmbedYoutube = (node: unknown): node is Link => {
  if (!isLink(node)) {
    return false;
  }
  if (!node.url.startsWith('https://www.youtube.com/watch')) {
    return false;
  }
  return true;
};
