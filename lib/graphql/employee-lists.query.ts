import { gql } from "graphql-request";

export const queryEmployeeListsByOrganization = (
  organization: string,
  after: string | null = null,
) => {
  return gql`
    query {
      employeeLists(
        orderBy: "createdAt"
        orderDirection: "desc"
        where: {organization: "${organization}"}
        ${after ? `after: "${after}"` : ""}
      ){
        items {
          createdAt
          employee
          id
          lastTransaction
          lastUpdated
          organization
          salary
          status
        }
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        totalCount
      }
    }
  `;
};

export const queryEmployeeListById = (id: string) => {
  return gql`
    query {
      employeeList(id: "${id}"){
        createdAt
        employee
        id
        lastTransaction
        lastUpdated
        organization
        salary
        status
      }
    }
  `;
};
