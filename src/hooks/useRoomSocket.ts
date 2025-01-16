import { useRouter } from "@/i18n/routing";
import matchEvents from "@/socket/matchEvents";
import { ChatMessage } from "@/types/chat";
import { Room } from "@/types/room";
import getRoomJson from "@/utils/room/getRoomJson";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useRoomSocket = (
  roomCode: string,
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setRoomData: React.Dispatch<React.SetStateAction<Room | null>>
) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  // Configurar Socket.io
  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_HOST);

    socketInstance.on("connect", () => {
      console.log("Socket conectado com ID: ", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket desconectado com ID: ", socketInstance.id);
    });

    socketInstance.on("player-joined", (updatedRoom: Room) => {
      setRoomData(getRoomJson(updatedRoom)); // Atualiza o estado da sala
    });

    socketInstance.on("player-left", (updatedRoom: Room) => {
      setRoomData(updatedRoom); // Atualiza o estado da sala
    });

    socketInstance.on("chat-message-received", (data) => {
      const newMessage: ChatMessage = {
        player: data.player,
        message: data.message,
      };
      setChat((prevChat: ChatMessage[]) => [...prevChat, newMessage]);
    });

    socketInstance.on("host-started-game", (updatedRoom: Room) => {
      setRoomData(updatedRoom);
      router.push(`/room/${roomCode}/match`);
    });

    matchEvents(socketInstance);

    // --------------------------------------------------------------------------------

    setSocket(socketInstance);

    // Limpa o socket ao desmontar
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // ---------------------------------------------------------------------------------------

  // const allPlayersChose = (players: Player[]) => {
  //   return players.every((p) => p.gameData.chosen != null);
  // };

  // const allPlayersGuessed = (players: Player[]) => {
  //   return players.every((p) => p.gameData.guess != null);
  // };

  // ---------------------------------------------------------------------------------------

  // const nextStatus = () => {};

  // const nextTurn = () => {
  //   setRoomData((prev: Room | null) => {
  //     // Verifica se 'prev' é válido
  //     if (!prev) return prev;

  //     // Pega o próximo jogador
  //     const nextPlayer =
  //       prev.gameData?.turn != null
  //         ? getNextTurnPlayer(prev.gameData.turn, prev.players)
  //         : prev.firstTurn;

  //     // Retorna o novo estado atualizado
  //     return {
  //       ...prev,
  //       gameData: {
  //         ...prev.gameData,
  //         turn: nextPlayer,
  //       },
  //     };
  //   });
  // };

  return { socket };
};

export default useRoomSocket;
