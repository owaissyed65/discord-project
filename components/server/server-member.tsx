"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";

import UserAvatar from "@/components/user-avatar";
import ActionTooltip from "../action-tooltip";

interface ServerMemberProps {
  member: Member & {
    profile: Profile;
  };
  server: Server;
}

const roleIconMap = {
  ADMIN: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  GUEST: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500" />,
};
const ServerMember = ({ member, server }: ServerMemberProps) => {
  const router = useRouter();
  const params = useParams();
  const Icon = roleIconMap[member?.role];
  
  
  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member?.id}`);
  };
  return (
    <ActionTooltip align="end" side="top" label={member?.role}>
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member?.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar
        src={member?.profile?.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member?.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member?.profile?.name}
      </p>
      {Icon}
    </button>
    </ActionTooltip>
  );
};

export default ServerMember;
