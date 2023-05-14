import openGraphScraper from 'open-graph-scraper';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const getOgpData = async (floatingUrls: string[]) => {
  const ogpDatas: any[] = [];
  if (floatingUrls.length === 0) return ogpDatas;

  await Promise.all(
    floatingUrls.map(async (url) => {
      const options = { url, onlyGetOpenGraphInfo: true };
      return openGraphScraper(options)
        .then((data) => {
          // OGP によるデータ取得が失敗した場合
          if (!data.result.success) {
            return;
          }
          // OGP によるデータ取得が成功した場合
          ogpDatas.push(data.result);
        })
        .catch((error) => {
          // error を throw するとビルドできないため、コンソールに出力して return する
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }),
  );
  return ogpDatas;
};

export const linkCardPlugin: Plugin = () => {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'a' &&
        node.children[0].type === 'text' &&
        node.children[0].value.startsWith('https://')
      ) {
        getOgpData([node.children[0].value]).then((data) => {
          // console.log(data)
          visit(tree, 'element', (node) => {
            if (
              node.tagName === 'a' &&
              node.children[0].type === 'text' &&
              node.children[0].value.startsWith(data[0].requestUrl)
            ) {
              console.log('💚' + JSON.stringify(node, null, 2));
              node.tagName = 'div';
              node.properties = {
                className: ['details'],
              };
            }
          });
        });
      }
    });
  };
};
