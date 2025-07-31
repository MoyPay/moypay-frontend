const env = process.env;

export const contractAddresses = {
  factory: (env.NEXT_PUBLIC_FACTORY_ADDRESS ||
    "0x7f8D91193c7a66ABE2FE69a90212269bBE9694C3") as HexAddress,
  earnStandard: (env.NEXT_PUBLIC_EARN_STANDARD_ADDRESS ||
    "0x0a3Fc1B5194B5564987F8062d1C9EC915B5B11d9") as HexAddress,
  mockUSDC: (env.NEXT_PUBLIC_MOCK_USDC_ADDRESS ||
    "0x2315a799b5E50b0454fbcA7237a723df4868F606") as HexAddress,
  organization: (env.NEXT_PUBLIC_ORGANIZATION_ADDRESS ||
    "0x7b71D00C84CFdfe92FCE52AB47a43CEb47530fC7") as HexAddress,
  mockVaultMorpho: (env.NEXT_PUBLIC_MOCK_VAULT_MORPHO_ADDRESS ||
    "0x36B797a6dC2DA60c1EbaEc6CCfD1d5AF3658E78a") as HexAddress,
  mockVaultCompound: (env.NEXT_PUBLIC_MOCK_VAULT_COMPOUND_ADDRESS ||
    "0xd642a577d77DF95bADE47F6A2329BA9d280400Ea") as HexAddress,
  mockVaultCentuari: (env.NEXT_PUBLIC_MOCK_VAULT_CENTUARI_ADDRESS ||
    "0x2E97c0d17fDaBfDeb5B35AA6bDB28c500Fc54eD2") as HexAddress,
  mockVaultTumbuh: (env.NEXT_PUBLIC_MOCK_VAULT_TUMBUH_ADDRESS ||
    "0xcFf972a750409Ddc3c628d6aDd50132705CA20d4") as HexAddress,
  mockVaultCaer: (env.NEXT_PUBLIC_MOCK_VAULT_CAER_ADDRESS ||
    "0x0c996cBCd0b81bFC20bf54e3bcCE8Ed4A39ac0Fb") as HexAddress,
  mockVaultAave: (env.NEXT_PUBLIC_MOCK_VAULT_AAVE_ADDRESS ||
    "0x722Ca412b27f38157e94AC5332A6D90f5aB7c5EF") as HexAddress,
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
