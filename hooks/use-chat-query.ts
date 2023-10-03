"use client";

// import { useParams } from "next/navigation";

import qs from "query-string";

import { useSocket } from "@/components/provider/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}
export const useChatQuery = ({
  apiUrl,
  queryKey,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();
  //   const params = useParams();
  const fetchMessage = async (value: any) => {
    console.log("hello");
    console.log(value);
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          cursor: value?.pageParam,
          [paramKey]: paramValue,
        },
      },
      { skipNull: true }
    );
    const res = await fetch(url);
    return await res.json();
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessage,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });
  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
