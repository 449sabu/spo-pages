export const fetchPoolInfo = async (
  pool_id: string,
): Promise<PoolInformation> => {
  const poolInformation = fetch('https://api.koios.rest/api/v0/pool_info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _pool_bech32_ids: [pool_id],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data[0];
    })
    .catch((error) => console.log(error));
  return poolInformation;
};

export const fetchPoolMetadata = async (url: string) => {
  const poolMetaDada = await fetch(`${url}`, {
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
  return poolMetaDada;
};

export const fetchDelegatorHistory = async (pool_id: string) => {
  const delegatorHistory = fetch(
    `https://api.koios.rest/api/v0/pool_delegators_history?_pool_bech32=${pool_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
  return delegatorHistory;
};
