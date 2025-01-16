"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import getRoom from "@/services/rooms/getRoom";
import { Room } from "@/types/room";
import { RoomContext } from "@/context/roomContext";
import { ChatMessage } from "@/types/chat";
import useRoomSocket from "@/hooks/useRoomSocket";

// No App Router, o arquivo layout.js é usado para compartilhar estado ou lógica entre todas as páginas filhas.
// Esse layout carrega os dados da sala e fornece às páginas filhas.

export default function RoomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { roomCode } = useParams(); // Pega o código da sala da URL
  const [loading, setLoading] = useState(true);
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);

  // Hook personalizado do socket
  const { socket } = useRoomSocket(String(roomCode), setChat, setRoomData);

  // Pega os dados da sala ao carregar a página
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const data = await getRoom(String(roomCode));
        setRoomData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomCode]);

  if (loading) {
    return <div>Loading...</div>; // TO-DO: FAZER UM componente DECENTE PARA ISSO
  }

  if (!roomData) {
    return <div>Room not found</div>; // TO-DO: FAZER UMA PÁGINA DECENTE PARA ISSO
  }

  return (
    <RoomContext.Provider value={{ room: roomData, socket, chat }}>
      {children}
    </RoomContext.Provider>
  );
}
