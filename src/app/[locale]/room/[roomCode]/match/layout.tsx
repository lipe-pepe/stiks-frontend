"use client";

import { MatchContext } from "@/context/matchContext";
import { useRoomContext } from "@/context/roomContext";
import useMatchSocket from "@/hooks/useMatchSocket";
import { ChatMessage } from "@/types/chat";
import { Match, MatchStatus } from "@/types/match";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function MatchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { room } = useRoomContext();

  const matchLoad: Match = {
    status: MatchStatus.choosing,
    round: 1,
    turn: room?.players[0].id || "",
    playersGameData:
      room?.players.map((p) => {
        return {
          ...p,
          total: 3,
          chosen: undefined,
          guess: undefined,
          revealed: false,
        };
      }) || [],
    totalSticks: 0,
  };
  const { roomCode } = useParams(); // Pega o código da sala da URL
  const [matchData, setMatchData] = useState<Match>(matchLoad);
  const [chat, setChat] = useState<ChatMessage[]>([]);

  // Hook personalizado do socket
  const { socket } = useMatchSocket(String(roomCode), setChat, setMatchData);

  return (
    <MatchContext.Provider value={{ match: matchData, socket, chat }}>
      {children}
    </MatchContext.Provider>
  );
}
