export const contractAddresses = {
  factory: "0x565Da780F19E7034887a2aD0200295eA42a85998" as HexAddress,
  earnStandard: "0x0F38FF858fE3974be7c05625281CA6b774Be9E9b" as HexAddress,
  mockUSDC: "0x0440d45A296fBD5d41D5B37DEF75DE710177b819" as HexAddress,
  organization: "0x3708b17f0187eE6eA382Ab3bFb692BA1E270A154" as HexAddress,
  mockVaultMorpho: "0xE0581d91Ddc882264bb5279f2946E4b9AaBb5BE1" as HexAddress,
  mockVaultCompound: "0x92c0969b14078Bc57DaEfEda63e24C22dDa35BDf" as HexAddress,
  mockVaultCentuari: "0x9F9eF7077Af3F9D76100B67A7C84771199e896f1" as HexAddress,
  mockVaultTumbuh: "0x7ae56b5f2f5428e824Ca71c96FeAD16094B545D8" as HexAddress,
  mockVaultCaer: "0xBe4E9FF3a59437F5c2b3514211809029704A1255" as HexAddress,
  mockVaultAave: "0x4D9010dFF9c71a8B46BAf69eA6AB332D1b4F151b" as HexAddress,
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
