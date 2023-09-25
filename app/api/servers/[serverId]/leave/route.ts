import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server Id is required", { status: 400 });
    }
    
    const server = await db?.server.update({
      where: {
        id: params?.serverId,
        profileId: {
          not: profile?.id,
        },
        members: {
          some: {
            profileId: profile?.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile?.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[LEAVE_PATCH] error", error);
    return new NextResponse("Some Internal Error", { status: 500 });
  }
}
