import useSWR, { SWRResponse } from 'swr';

export const PoolInformation = async (pool_bech32: string) => {
  const response = await fetch('https://api.koios.rest/api/v0/pool_info', {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _pool_bech32_ids: [pool_bech32],
    }),
  });
  return (await response.json()) as Array<PoolInformation>;
};

export const useMetadata = (
  fallbackData: Array<PoolInformation>,
): SWRResponse<Array<PoolInformation>> => {
  return useSWR(
    'PoolInformation',
    () => PoolInformation(fallbackData[0].pool_id_bech32),
    {
      fallbackData,
      revalidateOnMount: true,
    },
  );
};
