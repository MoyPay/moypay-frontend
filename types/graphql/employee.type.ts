import { PageInfo } from "./graphql.type";

export type EmployeeItem = {
  createdAt: string;
  employee: string;
  id: string;
  lastTransaction: string;
  lastUpdated: string;
  organization: string;
  salary: string;
  status: boolean;
  name: string;
  lastCompensationSalary: string;
  lastSalaryUpdated: number;
  lastStatusUpdated: number;
};

export type EmployeeListsResponse = {
  employeeLists: {
    items: EmployeeItem[];
    pageInfo: PageInfo;
    totalCount: number;
  };
};

export type EmployeeResponse = {
  employeeList: EmployeeItem;
};
