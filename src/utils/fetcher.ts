export const fetcher = async (url: string) => {
  const response = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
  return response;
};
