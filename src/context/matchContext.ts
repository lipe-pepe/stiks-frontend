import { createContext, useContext } from "react";
import { Match } from "@/types/match";
import { ChatMessage } from "@/types/chat";
import { Socket } from "socket.io-client";

interface MatchContextType {
  match: Match;
  socket: Socket | null;
  chat: ChatMessage[];
}

export const MatchContext = createContext<MatchContextType | null>(null);

export const useMatchContext = (): MatchContextType => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error(
      "useMatchContext must be used within a MatchContext.Provider"
    );
  }
  return context;
};
