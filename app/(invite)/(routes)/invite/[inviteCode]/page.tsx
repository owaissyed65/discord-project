import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}
const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  if (!params.inviteCode) {
    return redirect("/");
  }
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingServer) {
    console.log("existingServer");
    return redirect(`/servers/${existingServer.id}`);
  }
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile?.id,
            role: MemberRole.GUEST,
          },
        ],
      },
    },
  });
  if (server) {
    console.log("new server");
    return redirect(`/servers/${server.id}`);
  }
  return null;
};

export default InviteCodePage;
