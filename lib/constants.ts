const env = process.env;

export const contractAddresses = {
  factory: (env.NEXT_PUBLIC_FACTORY_ADDRESS ||
    "0x85F4C33FAF0B40c0Bb24e669d74603FB886B7613") as HexAddress,
  earnStandard: (env.NEXT_PUBLIC_EARN_STANDARD_ADDRESS ||
    "0x747F634765DAE9C33a166A270aE9473aE5282Ac4") as HexAddress,
  mockUSDC: (env.NEXT_PUBLIC_MOCK_USDC_ADDRESS ||
    "0xB9D0c7606b373584A93A1E26d4917013e19fE391") as HexAddress,
  organization: (env.NEXT_PUBLIC_ORGANIZATION_ADDRESS ||
    "0xB5393ED304fb7721d4B0cf9BF49fe5db5fa1325A") as HexAddress,
  mockVaultMorpho: (env.NEXT_PUBLIC_MOCK_VAULT_MORPHO_ADDRESS ||
    "0x776C5435a1DaDB4f9b9e3B8BC107fFeD0352D993") as HexAddress,
  mockVaultCompound: (env.NEXT_PUBLIC_MOCK_VAULT_COMPOUND_ADDRESS ||
    "0xB3B26c4839A92921d919e12486A4cFCACA5901E3") as HexAddress,
  mockVaultCentuari: (env.NEXT_PUBLIC_MOCK_VAULT_CENTUARI_ADDRESS ||
    "0xF80DcB48005C7c64b4a83283EAdfcF6D2d9B3C75") as HexAddress,
  mockVaultTumbuh: (env.NEXT_PUBLIC_MOCK_VAULT_TUMBUH_ADDRESS ||
    "0xd06765372e5C86b627Caf02cABaede731777Ea7E") as HexAddress,
  mockVaultCaer: (env.NEXT_PUBLIC_MOCK_VAULT_CAER_ADDRESS ||
    "0xB0Febfee86246e1BC16DfAaFB46c1524D682C93F") as HexAddress,
  mockVaultAave: (env.NEXT_PUBLIC_MOCK_VAULT_AAVE_ADDRESS ||
    "0x84bFa05FDC2A27734d9B19EDd7964A2DE2d6A0d3") as HexAddress,
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
