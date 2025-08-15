export const contractAddresses = {
  factory: "0x287C0fd28AB921f4f05Eb8326b809Ac2F9A817aa" as HexAddress,
  earnStandard: "0xbf67b224d53f2A44B159B43A5Cff8275220b5De1" as HexAddress,
  mockUSDC: "0xa023Abbc94cE56B8b722E891D2a3374aB8B83454" as HexAddress,
  organization: "0x77aa864dB88BF43999f4029b415B4ff2850E73a1" as HexAddress,
  mockVaultMorpho: "0x8EbcFb7e9B923a76716a45Bd600FbBbe191847fc" as HexAddress,
  mockVaultCompound: "0xfdD4156325c1a078fc6d5f272bd33c277A92cfaE" as HexAddress,
  mockVaultCentuari: "0x6c61F83F8F71B9a62EbcD2DeF27310fAa085b28B" as HexAddress,
  mockVaultTumbuh: "0x19bf76aF8b261b8eF8D4D87E9dED0ce0e27ed46F" as HexAddress,
  mockVaultCaer: "0x773D46F1Ad10110459D84535A664B59Ae98CAC7E" as HexAddress,
  mockVaultAave: "0xEB7262b444F450178D25A5690F49bE8E2Fe5A178" as HexAddress,
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

export const urlSubgraph = "https://indexer.moypay.xyz";
