type PoolInformation = {
  pool_id_bech32: string; // Pool ID (bech32 format)
  pool_id_hex: string; // Pool ID (Hex format)
  active_epoch_no: integer; // Epoch number in which the update becomes active
  vrf_key_hash: string; // Pool VRF key hash
  margin: number; // Margin (decimal format)
  fixed_cost: string; // Pool fixed cost per epoch
  pledge: string; // Pool pledge in lovelace
  reward_addr: string; // Pool reward address
  owners: [string]; //[ Pool (co)owner address ] Pool (co)owner address
  relays: Array<Relays>; // array of object
  meta_url: string | null; // Pool metadata URL
  meta_hash: string | null; // Pool metadata hash
  meta_json: {
    name: string;
    ticker: string;
    homepage: string;
    description: string;
  };
  pool_status: string; // Pool status registered┃retiring┃retired
  retiring_epoch: integer | null; // Announced retiring epoch (nullable)
  op_cert: string | null; // Pool latest operational certificate hash
  op_cert_counter: integer | null; // Pool latest operational certificate counter value
  active_stake: string | null; // Pool active stake (will be null post epoch transition until dbsync calculation is complete)
  sigma: number | null; // Pool relative active stake share
  block_count: integer | null; // Total pool blocks on chain
  live_pledge: string | null; // Summary of account balance for all pool owner's
  live_stake: string | null; // Pool live stake
  live_delegators: integer; // Pool live delegator count
  live_saturation: number | null; // Pool live saturation (decimal format)
};
