import ChatHeader from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
interface ConversatonMemberIdProps {
  params: {
    serverId: string;
    memberId: string;
  };
}
const ConversatonMemberId = async ({ params }: ConversatonMemberIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile?.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );
  if (!conversation) {
    return redirect(`/servers/${params?.serverId}`);
  }
  const { memberOne, memberTwo } = conversation;
  const otherMembers =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full ">
      <ChatHeader
        serverId={params?.serverId}
        name={otherMembers?.profile.name}
        imageUrl={otherMembers?.profile?.imageUrl}
        type="conversation"
      />
    </div>
  );
};

export default ConversatonMemberId;
