import { createContext, useContext } from "react";
import { Room } from "@/types/room";
import { Socket } from "socket.io-client";

interface RoomContextType {
  room: Room | null;
  socket: Socket | null;
}

export const RoomContext = createContext<RoomContextType | null>(null);

export const useRoomContext = (): RoomContextType => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error(
      "useRoomContext must be used within a RoomContext.Provider"
    );
  }
  return context;
};
