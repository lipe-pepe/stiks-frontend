"use client";

import { MatchContext } from "@/context/matchContext";
import { useRoomContext } from "@/context/roomContext";
import useMatchSocket from "@/hooks/useMatchSocket";
import getMatch from "@/services/matches/getMatch";
import { ChatMessage } from "@/types/chat";
import { Match } from "@/types/match";
import { useEffect, useState } from "react";

export default function MatchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { room } = useRoomContext();

  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState<Match | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);

  // Hook personalizado do socket
  const { socket } = useMatchSocket(setChat, setMatchData);

  // Pega os dados da partida ao carregar a página
  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const data = await getMatch(String(room?.matchId));
        setMatchData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [room]);

  useEffect(() => {
    console.log(matchData);
  }, [matchData]);

  if (loading) {
    return <div>Loading...</div>; // TO-DO: FAZER UM componente DECENTE PARA ISSO
  }

  if (matchData == null) {
    return <div>Match not found</div>; // TO-DO: FAZER UM componente DECENTE PARA ISSO
  }

  return (
    <MatchContext.Provider value={{ match: matchData, socket, chat }}>
      {children}
    </MatchContext.Provider>
  );
}
