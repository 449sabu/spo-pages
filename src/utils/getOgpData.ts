import openGraphScraper from 'open-graph-scraper';

export const getOgpData = async (url: string) => {
  const options = { url, onlyGetOpenGraphInfo: true };
  return openGraphScraper(options).then((data) => {
    // OGP によるデータ取得が失敗した場合
    if (!data.result.success) {
      return {
        url: url,
        title: '',
        description: '',
        og: '',
        icon: '',
      };
    }
    // OGP によるデータ取得が成功した場合
    return {
      url: url,
      title: data.result.ogTitle || '',
      description: data.result.ogDescription || '',
      og: data.result.ogImage ? data.result.ogImage[0].url : '',
      icon: '',
    };
  });
  // .catch((error) => {
  // 	console.log(error);

  // 	return {
  // 		url: url,
  // 		title: "",
  // 		description: "",
  // 		og: "",
  // 		icon: "",
  // 	};
  // });
};
