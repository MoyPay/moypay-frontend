const env = process.env;

export const contractAddresses = {
  factory: (env.NEXT_PUBLIC_FACTORY_ADDRESS ||
    "0x9677AB9177b2810b6F6dF9A90BC74E8Cf0618818") as HexAddress,
  earnStandard: (env.NEXT_PUBLIC_EARN_STANDARD_ADDRESS ||
    "0xFE5C24FD330580070779312E5e1B8eF4Fa583E1d") as HexAddress,
  mockUSDC: (env.NEXT_PUBLIC_MOCK_USDC_ADDRESS ||
    "0x0440d45A296fBD5d41D5B37DEF75DE710177b819") as HexAddress,
  organization: (env.NEXT_PUBLIC_ORGANIZATION_ADDRESS ||
    "0x82DaD7EE46E37C8e40f88a3695ccE2a190857024") as HexAddress,
  mockVaultMorpho: (env.NEXT_PUBLIC_MOCK_VAULT_MORPHO_ADDRESS ||
    "0x392FB77db608d8c0e661BFff7d0DF1d145Fef68C") as HexAddress,
  mockVaultCompound: (env.NEXT_PUBLIC_MOCK_VAULT_COMPOUND_ADDRESS ||
    "0x4A63acbaE248D99b9d77274Bdef358757297E2a1") as HexAddress,
  mockVaultCentuari: (env.NEXT_PUBLIC_MOCK_VAULT_CENTUARI_ADDRESS ||
    "0x52C034374f55e2A80AdF0079Ea517F17918d7Fd3") as HexAddress,
  mockVaultTumbuh: (env.NEXT_PUBLIC_MOCK_VAULT_TUMBUH_ADDRESS ||
    "0x82bC74DbF0da054E8c6791513514dEd0A74582A0") as HexAddress,
  mockVaultCaer: (env.NEXT_PUBLIC_MOCK_VAULT_CAER_ADDRESS ||
    "0x1cDeaBc483368725329180e99264067842469075") as HexAddress,
  mockVaultAave: (env.NEXT_PUBLIC_MOCK_VAULT_AAVE_ADDRESS ||
    "0x7608fBFDBF6D05da104E753872a6f38D513682fb") as HexAddress,
} as const;

export const PERIOD_TIMES = {
  DAILY: 86400,
  WEEKLY: 604800,
  MONTHLY: 2592000,
  YEARLY: 31536000,
} as const;

export const PERIOD_LABELS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

export const urlSubgraph =
  env.NEXT_PUBLIC_API_SUBGRAPH_BASE_SEPOLIA_URL || "https://indexer.moypay.xyz";
