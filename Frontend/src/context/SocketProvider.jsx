import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export function SocketProvider({ children }) {
  const socket = useMemo(() => io(import.meta.env.VITE_REALTIME_URL), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
