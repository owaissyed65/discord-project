"use client";
import React from "react";
import { Member } from "@prisma/client";
import ChatWelcome from "@/components/chat/chat-welcome";

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
  return (
    <div className="flex-1 flex-col py-4 overflow-y-auto">
      <div className="flex-1">
        <ChatWelcome name={name} type={type} />
      </div>
    </div>
  );
};

export default ChatMessages;
