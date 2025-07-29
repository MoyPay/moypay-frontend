export const contractAddresses = {
  factory:
    process.env.NEXT_PUBLIC_FACTORY_ADDRESS ||
    "0x700d18196d14244FcD7e9D87d5bBF5DE3c33B0e8",
  earnStandard:
    process.env.NEXT_PUBLIC_EARN_STANDARD_ADDRESS ||
    "0xCaBFa324576c655D0276647A7f0aF5e779123e0B",
  mockUSDC:
    process.env.NEXT_PUBLIC_MOCK_USDC_ADDRESS ||
    "0x9dAf66b75d348D4f90B125a282bBFA608Ecec13C",
  mockVault:
    process.env.NEXT_PUBLIC_MOCK_VAULT_ADDRESS ||
    "0xA8adEFE2C8f0F71a585a73c1259997f593F9e463",
} as const;

export const PERIOD_TIMES = {
  DAILY: 86400,
  WEEKLY: 604800,
  MONTHLY: 2629746,
  YEARLY: 31556952,
} as const;

export const urlSubgraph =
  process.env.NEXT_PUBLIC_API_SUBGRAPH_BASE_SEPOLIA_URL;
