import { useState, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "graphql-request";
import { useAccount } from "wagmi";

import { urlSubgraph } from "@/lib/constants";
import { OrganizationListsResponse } from "@/types/graphql/organization.type";
import { queryOrganizationListsByOwner } from "@/lib/graphql/organization-lists.query";

type CachedOrganizationData = {
  allItems: OrganizationListsResponse["organizationLists"]["items"];
  endCursor: string | null;
  totalCount: number;
  pageInfo: OrganizationListsResponse["organizationLists"]["pageInfo"];
};

export const useOrganizationListsByOwner = () => {
  const { address: userAddress } = useAccount();
  const queryClient = useQueryClient();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const cacheKey = ["organizationListsAccumulated", userAddress];

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

  const { isLoading, isError, refetch, isFetching } =
    useQuery<OrganizationListsResponse>({
      queryKey: ["organizationListsByOwner", userAddress, cachedData.endCursor],
      queryFn: async () => {
        if (!userAddress) {
          throw new Error("Address is required");
        }

        const result = await request<OrganizationListsResponse>(
          urlSubgraph,
          queryOrganizationListsByOwner(userAddress, cachedData.endCursor),
        );

        const currentCached = getCachedData();
        const newCachedData: CachedOrganizationData = {
          allItems: [
            ...currentCached.allItems,
            ...result.organizationLists.items,
          ],
          endCursor: result.organizationLists.pageInfo.endCursor,
          totalCount: result.organizationLists.totalCount,
          pageInfo: result.organizationLists.pageInfo,
        };

        setCachedData(newCachedData);

        return result;
      },
      enabled: !!userAddress,
      staleTime: 30 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

  const keepCacheAlive = useCallback(() => {
    const data = getCachedData();

    if (data.allItems.length > 0) {
      queryClient.setQueryData(cacheKey, data, {
        updatedAt: Date.now(),
      });
    }
  }, [getCachedData, queryClient, cacheKey]);

  useMemo(() => {
    const interval = setInterval(keepCacheAlive, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [keepCacheAlive]);

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
      queryKey: ["organizationListsByOwner", userAddress],
    });
  }, [setCachedData, queryClient, userAddress]);

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
        const result = await request<OrganizationListsResponse>(
          urlSubgraph,
          queryOrganizationListsByOwner(userAddress, cursor),
        );

        currentData = {
          allItems: [
            ...currentData.allItems,
            ...result.organizationLists.items,
          ],
          endCursor: result.organizationLists.pageInfo.endCursor,
          totalCount: result.organizationLists.totalCount,
          pageInfo: result.organizationLists.pageInfo,
        };
        setCachedData(currentData);

        cursor = result.organizationLists.pageInfo.endCursor;
        hasMore = result.organizationLists.pageInfo.hasNextPage;
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
