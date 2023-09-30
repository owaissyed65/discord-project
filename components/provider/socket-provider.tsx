"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";
interface SocketContextTypes {
  socket: any | null;
  isConnected: boolean;
}

const socketContext = createContext<SocketContextTypes>({
  isConnected: false,
  socket: null,
});
type stateTypes = boolean;

export const useSocket = () => {
  return useContext(socketContext);
};
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setConnected] = useState<stateTypes>(false);
  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    );
    socketInstance.on("connect", () => {
      setConnected(true);
    });
    socketInstance.on("disconnect", () => {
      setConnected(false);
    });
    setSocket(socketInstance);
    return () => socketInstance.disconnect();
  }, []);
  return (
    <socketContext.Provider value={{ socket, isConnected }}>
      {children}
    </socketContext.Provider>
  );
};
