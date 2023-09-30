import { NextApiResponseServerIO } from "@/types";
import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketIo } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};
export const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new SocketIo(httpServer, {
      path,
      // @ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }
  res.end()
};
