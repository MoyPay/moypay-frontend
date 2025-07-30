import { useState, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "graphql-request";

import { urlSubgraph } from "@/lib/constants";
import { EmployeeListsResponse } from "@/types/graphql/employee.type";
import { queryEmployeeListsByEmployee } from "@/lib/graphql/employee-lists.query";

type CachedEmployeeData = {
  allItems: EmployeeListsResponse["employeeLists"]["items"];
  endCursor: string | null;
  totalCount: number;
  pageInfo: EmployeeListsResponse["employeeLists"]["pageInfo"];
};

export const useEmployeeListsByEmployee = ({
  employeeAddress,
  enabled,
}: {
  employeeAddress: string;
  enabled?: boolean;
}) => {
  const queryClient = useQueryClient();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const cacheKey = ["employeeListsByEmployeeAccumulated", employeeAddress];

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

  const { data, isLoading, isError, refetch, isFetching, error } =
    useQuery<EmployeeListsResponse>({
      queryKey: [
        "employeeListsByEmployee",
        employeeAddress,
        cachedData.endCursor,
      ],
      queryFn: async () => {
        if (!employeeAddress) {
          throw new Error("Address is required");
        }

        const result = await request<EmployeeListsResponse>(
          urlSubgraph,
          queryEmployeeListsByEmployee(employeeAddress, cachedData.endCursor),
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
      enabled: !!employeeAddress || enabled,
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
      queryKey: ["employeeListsByEmployee", employeeAddress],
    });
  }, [setCachedData, queryClient, employeeAddress]);

  if (
    employeeAddress &&
    cachedData.allItems.length > 0 &&
    data?.employeeLists.pageInfo.endCursor === null &&
    !isFetching &&
    !isFetchingMore
  ) {
    setTimeout(() => resetPagination(), 0);
  }

  const hasNextPage = cachedData.pageInfo?.hasNextPage ?? false;

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || !employeeAddress || isFetching || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    try {
      await refetch();
    } finally {
      setIsFetchingMore(false);
    }
  }, [hasNextPage, employeeAddress, refetch, isFetching, isFetchingMore]);

  const fetchAllPages = useCallback(async () => {
    if (!employeeAddress || isFetching || isFetchingMore) {
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
          queryEmployeeListsByEmployee(employeeAddress, cursor),
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
    employeeAddress,
    isFetching,
    isFetchingMore,
    getCachedData,
    setCachedData,
  ]);

  return useMemo(
    () => ({
      data: cachedData.allItems[0],
      isLoading: isLoading || isFetchingMore,
      isError,
      hasNextPage,
      fetchNextPage,
      fetchAllPages,
      totalCount: cachedData.totalCount,
      pageInfo: cachedData.pageInfo,
      error,
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
      error,
      resetPagination,
    ],
  );
};
