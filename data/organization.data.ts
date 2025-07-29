export interface OrganizationData {
  id: string;
  address: string;
  tokenAddress: string;
  name: string;
  balance: string;
  employeeCount: string;
  periodTime: string;
}

export const organizationData = [
  {
    id: "1",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    tokenAddress: "0x9dAf66b75d348D4f90B125a282bBFA608Ecec13C",
    name: "MoyPay Inc.",
    balance: "1000000000000000000",
    employeeCount: "10",
    periodTime: "604800",
  },
  {
    id: "2",
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    tokenAddress: "0x9dAf66b75d348D4f90B125a282bBFA608Ecec13C",
    name: "EtherLink Solutions",
    balance: "5000000000000000000",
    employeeCount: "5",
    periodTime: "2629746",
  },
];
