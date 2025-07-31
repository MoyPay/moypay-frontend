const env = process.env;

export const contractAddresses = {
  factory: (env.NEXT_PUBLIC_FACTORY_ADDRESS ||
    "0xC4F36C2cBe0f2B2500b9472619149fbCC96F8669") as HexAddress,
  earnStandard: (env.NEXT_PUBLIC_EARN_STANDARD_ADDRESS ||
    "0xB4054587Cc5bc1F3dC67c6BD761c06194F8Dad6b") as HexAddress,
  mockUSDC: (env.NEXT_PUBLIC_MOCK_USDC_ADDRESS ||
    "0x8417E8dD96Df9043c7a035F1916644e839B66539") as HexAddress,
  organization: (env.NEXT_PUBLIC_ORGANIZATION_ADDRESS ||
    "0x472D927f50bBbCf493fF70f00344e419c4344158") as HexAddress,
  mockVaultMorpho: (env.NEXT_PUBLIC_MOCK_VAULT_MORPHO_ADDRESS ||
    "0x3f7563696E8be45f0B20BC2D99D220B1925E8efd") as HexAddress,
  mockVaultCompound: (env.NEXT_PUBLIC_MOCK_VAULT_COMPOUND_ADDRESS ||
    "0xF0470C81960C1f40A8A56e654034aC5176356AA2") as HexAddress,
  mockVaultCentuari: (env.NEXT_PUBLIC_MOCK_VAULT_CENTUARI_ADDRESS ||
    "0xa6c5C0dFe1fBD9e7361B459Fa18C08249805be55") as HexAddress,
  mockVaultTumbuh: (env.NEXT_PUBLIC_MOCK_VAULT_TUMBUH_ADDRESS ||
    "0x19Be1130c14f24BEdB66d96cF644EF23d6E6b67B") as HexAddress,
  mockVaultCaer: (env.NEXT_PUBLIC_MOCK_VAULT_CAER_ADDRESS ||
    "0x25a8E5093460825554B91303E293543538E91A65") as HexAddress,
  mockVaultAave: (env.NEXT_PUBLIC_MOCK_VAULT_AAVE_ADDRESS ||
    "0x902bf8CaC2222a8897d07864BEB49C291633B70E") as HexAddress,
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
