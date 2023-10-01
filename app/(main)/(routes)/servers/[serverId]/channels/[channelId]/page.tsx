import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
interface ChannelIdProps {
  params: {
    channelId: string;
    serverId: string;
  };
}

const ChannelId = async ({ params }: ChannelIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile?.id,
    },
  });
  if (!channel || !member) {
    return redirect("/");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full ">
      <ChatHeader
        serverId={params?.serverId}
        name={channel?.name}
        type="channel"
      />
      <div className="flex-1">future message</div>
      <ChatInput
        name={channel?.name}
        apiUrl="/api/socket/messages"
        query={{ serverId: channel?.serverId, channelId: channel?.id }}
        type="channel"
      />
    </div>
  );
};

export default ChannelId;
