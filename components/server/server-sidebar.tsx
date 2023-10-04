import React from "react";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

import { Hash, Mic, ShieldCheck, Video } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import ServerHeader from "./server-header";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  if (!server) {
    return redirect("/");
  }
  const textChannels = server?.channels?.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels?.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels?.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members?.filter(
    (member) => member.profileId !== profile.id
  );
  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  const iconMap = {
    TEXT: <Hash className="mr-2 h-4 w-4" />,
    AUDIO: <Mic className="mr-2 h-4 w-4" />,
    VIDEO: <Video className="mr-2 h-4 w-4" />,
  };

  const roleIconMap = {
    ADMIN: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    GUEST: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />,
  };

  // console.log(server);
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                type: "channel",
                label: "Text Channels",
                data: textChannels?.map((channel) => ({
                  name: channel?.name,
                  id: channel?.id,
                  icon:  iconMap[channel?.type],
                })),
              },
              {
                type: "channel",
                label: "Voice Channels",
                data: audioChannels?.map((channel) => ({
                  name: channel?.name,
                  id: channel?.id,
                  icon: iconMap[channel?.type],
                })),
              },
              {
                type: "channel",
                label: "Video Channels",
                data: videoChannels?.map((channel) => ({
                  name: channel?.name,
                  id: channel?.id,
                  icon: iconMap[channel?.type],
                })),
              },
              {
                type: "member",
                label: "Members",
                data: members?.map((member) => ({
                  name: member?.profile?.name,
                  id: member?.profile?.id,
                  icon: roleIconMap[member?.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="dark:bg-zinc-700 bg-zinc-300" />
        {!!textChannels.length && (
          <div className="mb-2">
            <ServerSection
              role={role}
              label="Text Channels"
              channelType={ChannelType.TEXT}
              sectionType="channel"
              // server={server}
            />
            {textChannels?.map((channel) => (
              <ServerChannel
                key={channel?.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {!!audioChannels.length && (
          <div className="mb-2">
            <ServerSection
              role={role}
              label="Voice Channels"
              channelType={ChannelType.AUDIO}
              sectionType="channel"
              // server={server}
            />
            {audioChannels?.map((channel) => (
              <ServerChannel
                key={channel?.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {!!videoChannels.length && (
          <div className="mb-2">
            <ServerSection
              role={role}
              label="Video Channels"
              channelType={ChannelType.VIDEO}
              sectionType="channel"
              // server={server}
            />
            {videoChannels?.map((channel) => (
              <ServerChannel
                key={channel?.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              role={role}
              label="Members"
              sectionType="member"
              server={server}
            />
            {members?.map((channel) => (
              <ServerMember key={channel.id} member={channel} server={server} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
