import { useState, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "graphql-request";
import { useAccount } from "wagmi";

import { urlSubgraph } from "@/lib/constants";
import { OrganizationJoinedListsResponse } from "@/types/graphql/organization-joined.type";
import { queryOrganizationJoinedListsByEmployee } from "@/lib/graphql/organization-joined-lists.query";

type CachedOrganizationData = {
  allItems: OrganizationJoinedListsResponse["organizationJoinedLists"]["items"];
  endCursor: string | null;
  totalCount: number;
  pageInfo: OrganizationJoinedListsResponse["organizationJoinedLists"]["pageInfo"];
};

export const useOrganizationJoinedListsByEmployee = () => {
  const { address: userAddress } = useAccount();
  const queryClient = useQueryClient();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const cacheKey = ["organizationJoinedListsAccumulated", userAddress];

  const getCachedData = useCallback((): CachedOrganizationData => {
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
    (data: CachedOrganizationData) => {
      queryClient.setQueryData(cacheKey, data);
    },
    [queryClient, cacheKey],
  );

  const cachedData = getCachedData();

  const { data, isLoading, isError, refetch, isFetching } =
    useQuery<OrganizationJoinedListsResponse>({
      queryKey: [
        "organizationJoinedListsByOwner",
        userAddress,
        cachedData.endCursor,
      ],
      queryFn: async () => {
        if (!userAddress) {
          throw new Error("Address is required");
        }

        const result = await request<OrganizationJoinedListsResponse>(
          urlSubgraph,
          queryOrganizationJoinedListsByEmployee(
            userAddress,
            cachedData.endCursor,
          ),
        );

        const currentCached = getCachedData();
        const newCachedData: CachedOrganizationData = {
          allItems: [
            ...currentCached.allItems,
            ...result.organizationJoinedLists.items,
          ],
          endCursor: result.organizationJoinedLists.pageInfo.endCursor,
          totalCount: result.organizationJoinedLists.totalCount,
          pageInfo: result.organizationJoinedLists.pageInfo,
        };

        setCachedData(newCachedData);

        return result;
      },
      enabled: !!userAddress,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

  const resetPagination = useCallback(() => {
    const resetData: CachedOrganizationData = {
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
      queryKey: ["organizationJoinedListsByOwner", userAddress],
    });
  }, [setCachedData, queryClient, userAddress]);

  if (
    userAddress &&
    cachedData.allItems.length > 0 &&
    data?.organizationJoinedLists.pageInfo.endCursor === null &&
    !isFetching &&
    !isFetchingMore
  ) {
    setTimeout(() => resetPagination(), 0);
  }

  const hasNextPage = cachedData.pageInfo?.hasNextPage ?? false;

  const fetchNextPage = useCallback(async () => {
    if (!hasNextPage || !userAddress || isFetching || isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    try {
      await refetch();
    } finally {
      setIsFetchingMore(false);
    }
  }, [hasNextPage, userAddress, refetch, isFetching, isFetchingMore]);

  const fetchAllPages = useCallback(async () => {
    if (!userAddress || isFetching || isFetchingMore) {
      return;
    }

    setIsFetchingMore(true);
    try {
      let currentData = getCachedData();
      let cursor = currentData.endCursor;
      let hasMore = currentData.pageInfo?.hasNextPage ?? true;

      while (hasMore) {
        const result = await request<OrganizationJoinedListsResponse>(
          urlSubgraph,
          queryOrganizationJoinedListsByEmployee(userAddress, cursor),
        );

        currentData = {
          allItems: [
            ...currentData.allItems,
            ...result.organizationJoinedLists.items,
          ],
          endCursor: result.organizationJoinedLists.pageInfo.endCursor,
          totalCount: result.organizationJoinedLists.totalCount,
          pageInfo: result.organizationJoinedLists.pageInfo,
        };
        setCachedData(currentData);

        cursor = result.organizationJoinedLists.pageInfo.endCursor;
        hasMore = result.organizationJoinedLists.pageInfo.hasNextPage;
      }
    } finally {
      setIsFetchingMore(false);
    }
  }, [userAddress, isFetching, isFetchingMore, getCachedData, setCachedData]);

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
