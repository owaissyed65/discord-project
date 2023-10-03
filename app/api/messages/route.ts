import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";
const MESSAGE_BATCH = 10;
export const GET = async (req: Request) => {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");
    if (!profile) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
    if (!channelId) {
      return new NextResponse("channelId is Missing", { status: 400 });
    }
    let message: Message[] = [];
    if (cursor) {
      message = await db.message.findMany({
        take: MESSAGE_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      message = await db.message.findMany({
        take: MESSAGE_BATCH,
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    let nextCursor = null;
    if (message.length === MESSAGE_BATCH) {
      nextCursor = message[MESSAGE_BATCH - 1].id;
    }
    return NextResponse.json({
      item: message,
      nextCursor: nextCursor,
    });
  } catch (error) {
    console.log("MESSAGE_GET", error);
    return new NextResponse("Some internal Error", { status: 301 });
  }
};
