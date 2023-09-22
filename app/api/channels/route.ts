import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const { name, type } = await req.json();

    if (!profile) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name Is Required", { status: 400 });
    }
    if (!type) {
      return new NextResponse("Type Is Required", { status: 400 });
    }
    if (name === "general") {
      return new NextResponse("Name can't be 'general'", { status: 400 });
    }
    if (!serverId) {
      return new NextResponse("Server Id is Required", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile?.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: [
            {
              name,
              type,
              profileId: profile?.id,
            },
          ],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_POST]ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
