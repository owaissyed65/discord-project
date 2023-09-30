"use client";
import { Hash, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "../user-avatar";
import SocketIndicator from "@/components/socket-indicator";
interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}
const ChatHeader = ({ name, serverId, type, imageUrl }: ChatHeaderProps) => {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="text-zinc-500 w-5 h-5 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl!} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center"><SocketIndicator/></div>
    </div>
  );
};

export default ChatHeader;
