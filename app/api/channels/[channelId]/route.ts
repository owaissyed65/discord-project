import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server Id is Required", { status: 400 });
    }
    if (!params.channelId) {
      return new NextResponse("Channel Id is required", { status: 400 });
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
          delete: {
            id: params?.channelId,
            name: {
              not: "general",
            },

          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_ID DELETE]error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server Id is Required", { status: 400 });
    }
    if (!params.channelId) {
      return new NextResponse("Channel Id is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is missing", { status: 400 });
    }
    if (!type) {
      return new NextResponse("Typw is missing", { status: 400 });
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
          update: {
            where: {
              id: params?.channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },/////
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_ID PATCH]error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
