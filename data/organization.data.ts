export interface OrganizationData {
  activeEmployees: number;
  countDeposits: number;
  countWithdraws: number;
  createdAt: number;
  id: string;
  lastTransaction: string;
  lastUpdated: number;
  organization: string;
  owner: string;
  periodTime: string;
  token: string;
  totalDeposits: string;
  totalEmployees: number;
  totalWithdrawals: string;
}

// activeEmployees: number;
// countDeposits: number;
// countWithdraws: number;
// createdAt: number;
// id: string;
// lastTransaction: string;
// lastUpdated: number;
// organization: string;
// owner: string;
// periodTime: string;
// token: string;
// totalDeposits: string;
// totalEmployees: number;
// totalWithdrawals: string;

export const organizationData = [
  {
    activeEmployees: 0,
    countDeposits: 1,
    countWithdraws: 0,
    createdAt: 1753823982,
    id: "0x5afbF5FD94AFdF983785df39C09d7af56123da07",
    lastTransaction:
      "0x1add350ce02bf8937b51c92f2902874cb311feba4dc60035d794bb421c2bd922",
    lastUpdated: 1753827005,
    organization: "0x5afbF5FD94AFdF983785df39C09d7af56123da07",
    owner: "0x3B4f0135465d444a5bD06Ab90fC59B73916C85F5",
    periodTime: "0",
    token: "0x57F0b106BD8779B7Ff721126e01fD757D48d265E",
    totalDeposits: "100000000000000000000",
    totalEmployees: 1,
    totalWithdrawals: "0",
  },
  {
    activeEmployees: 0,
    countDeposits: 2,
    countWithdraws: 0,
    createdAt: 1753825490,
    id: "0xaC225173a833fD4fED58Ec104486e4133c25cd54",
    lastTransaction:
      "0x5590d7389aceda37043bf1dfb6fdb1ed355dbd35a8f8808cc42f369bbff713b1",
    lastUpdated: 1753828460,
    organization: "0xaC225173a833fD4fED58Ec104486e4133c25cd54",
    owner: "0x3B4f0135465d444a5bD06Ab90fC59B73916C85F5",
    periodTime: "0",
    token: "0x57F0b106BD8779B7Ff721126e01fD757D48d265E",
    totalDeposits: "110000000000000000000",
    totalEmployees: 0,
    totalWithdrawals: "0",
  },
];
