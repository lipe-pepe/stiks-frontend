import { createContext, useContext } from "react";
import { Room } from "@/types/room";

interface RoomContextType {
  room: Room | null;
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
