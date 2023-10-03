"use client";
import React, { Fragment } from "react";

import { Loader2, ServerCrash } from "lucide-react";
import { Member, Message, Profile } from "@prisma/client";
import { format } from "date-fns";

import ChatWelcome from "@/components/chat/chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import ChatItems from "@/components/chat/chat-items";
import { DATE_FORMAT } from "@/const";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}
type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};
const ChatMessages = ({
  apiUrl,
  chatId,
  member,
  name,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ apiUrl, paramKey, paramValue, queryKey });

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center flex-1 justify-center ">
        <Loader2 className="animate-spin h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-400 dark:text-zinc-500 ">
          Loading Messages...
        </p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex flex-col items-center flex-1 justify-center ">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-400 dark:text-zinc-500 ">
          Oops Something Went wrong!
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1 ">
        <ChatWelcome name={name} type={type} />
        <div className="flex flex-col-reverse mt-auto">
          {data?.pages?.map((group, i) => (
            <Fragment key={i}>
              {group?.item?.map((message: MessageWithMemberWithProfile) => (
                <ChatItems
                  key={message.id}
                  content={message?.content}
                  member={message?.member}
                  id={message?.id}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  isUpdated={message?.updatedAt !== message.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                  fileUrl={message?.fileUrl}
                  deleted={message?.deleted}
                  currentMember={member}
                  
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
