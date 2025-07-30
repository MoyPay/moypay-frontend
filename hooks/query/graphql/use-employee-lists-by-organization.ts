import { useState, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "graphql-request";

import { urlSubgraph } from "@/lib/constants";
import { queryEmployeeListsByOrganization } from "@/lib/graphql/employee-lists.query";
import { EmployeeListsResponse } from "@/types/graphql/employee.type";

type CachedEmployeeData = {
  allItems: EmployeeListsResponse["employeeLists"]["items"];
  endCursor: string | null;
  totalCount: number;
  pageInfo: EmployeeListsResponse["employeeLists"]["pageInfo"];
};

export const useEmployeeListsByOrganization = ({
  organizationAddress,
}: {
  organizationAddress: string;
}) => {
  const queryClient = useQueryClient();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const cacheKey = ["employeeListsAccumulated", organizationAddress];

  const getCachedData = useCallback((): CachedEmployeeData => {
    return (
      queryClient.getQueryData(cacheKey) || {
        allItems: [],
        endCursor: null,
        totalCount: 0,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "",
          endCursor: "",
        },
      }
    );
  }, [queryClient, cacheKey]);

  const setCachedData = useCallback(
    (data: CachedEmployeeData) => {
      queryClient.setQueryData(cacheKey, data);
    },
    [queryClient, cacheKey],
  );

  const cachedData = getCachedData();

  const { data, isLoading, isError, refetch, isFetching } =
    useQuery<EmployeeListsResponse>({
      queryKey: [
        "employeeListsByOrganization",
        organizationAddress,
        cachedData.endCursor,
      ],
      queryFn: async () => {
        if (!organizationAddress) {
          throw new Error("Address is required");
        }

        const result = await request<EmployeeListsResponse>(
          urlSubgraph,
          queryEmployeeListsByOrganization(
            organizationAddress,
            cachedData.endCursor,
          ),
        );

        const currentCached = getCachedData();
        const newCachedData: CachedEmployeeData = {
          allItems: [...currentCached.allItems, ...result.employeeLists.items],
          endCursor: result.employeeLists.pageInfo.endCursor,
          totalCount: result.employeeLists.totalCount,
          pageInfo: result.employeeLists.pageInfo,
        };

        setCachedData(newCachedData);

        return result;
      },
      enabled: !!organizationAddress,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  const resetPagination = useCallback(() => {
    const resetData: CachedEmployeeData = {
      allItems: [],
      endCursor: null,
      totalCount: 0,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "",
        endCursor: "",
      },
    };

    setCachedData(resetData);

    queryClient.invalidateQueries({
      queryKey: ["employeeListsByOrganization", organizationAddress],
    });
  }, [setCachedData, queryClient, organizationAddress]);

  if (
    organizationAddress &&
    cachedData.allItems.length > 0 &&
    data?.employeeLists.pageInfo.endCursor === null &&
    !isFetching &&
    !isFetchingMore
  ) {
    setTimeout(() => resetPagination(), 0);
  }

  const hasNextPage = cachedData.pageInfo?.hasNextPage ?? false;

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || !organizationAddress || isFetching || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    try {
      await refetch();
    } finally {
      setIsFetchingMore(false);
    }
  }, [hasNextPage, organizationAddress, refetch, isFetching, isFetchingMore]);

  const fetchAllPages = useCallback(async () => {
    if (!organizationAddress || isFetching || isFetchingMore) {
      return;
    }

    setIsFetchingMore(true);
    try {
      let currentData = getCachedData();
      let cursor = currentData.endCursor;
      let hasMore = currentData.pageInfo?.hasNextPage ?? true;

      while (hasMore) {
        const result = await request<EmployeeListsResponse>(
          urlSubgraph,
          queryEmployeeListsByOrganization(organizationAddress, cursor),
        );

        currentData = {
          allItems: [...currentData.allItems, ...result.employeeLists.items],
          endCursor: result.employeeLists.pageInfo.endCursor,
          totalCount: result.employeeLists.totalCount,
          pageInfo: result.employeeLists.pageInfo,
        };
        setCachedData(currentData);

        cursor = result.employeeLists.pageInfo.endCursor;
        hasMore = result.employeeLists.pageInfo.hasNextPage;
      }
    } finally {
      setIsFetchingMore(false);
    }
  }, [
    organizationAddress,
    isFetching,
    isFetchingMore,
    getCachedData,
    setCachedData,
  ]);

  return useMemo(
    () => ({
      data: cachedData.allItems,
      isLoading: isLoading || isFetchingMore,
      isError,
      hasNextPage,
      fetchNextPage,
      fetchAllPages,
      totalCount: cachedData.totalCount,
      pageInfo: cachedData.pageInfo,
      resetPagination,
    }),
    [
      cachedData.allItems,
      cachedData.totalCount,
      cachedData.pageInfo,
      isLoading,
      isFetchingMore,
      isError,
      hasNextPage,
      fetchNextPage,
      fetchAllPages,
      resetPagination,
    ],
  );
};
