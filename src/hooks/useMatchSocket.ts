import { ChatMessage } from "@/types/chat";
import { Match } from "@/types/match";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useMatchSocket = (
  roomCode: string,
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setMatchData: React.Dispatch<React.SetStateAction<Match>>
) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  // Configurar Socket.io
  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_HOST);

    socketInstance.on("connect", () => {
      console.log("Socket conectado com ID: ", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket desconectado com ID: ", socketInstance.id);
    });

    socketInstance.on("chat-message-received", (data) => {
      const newMessage: ChatMessage = {
        player: data.player,
        message: data.message,
      };
      setChat((prevChat: ChatMessage[]) => [...prevChat, newMessage]);
    });

    socketInstance.on("player-chose", (data) => {
      console.log(data);
      setMatchData((prev) => {
        const updatedPlayers = prev.playersGameData.map((p) => {
          if (p.id === data.playerId) {
            return {
              ...p,
              chosen: data.value,
            };
          }
          return p; // Retorna o jogador original
        });
        console.log(updatedPlayers);
        // Retorna o novo estado atualizado
        return {
          ...prev,
          playersGameData: updatedPlayers,
        };
      });
    });

    setSocket(socketInstance);

    // Limpa o socket ao desmontar
    return () => {
      socketInstance.disconnect();
    };
  }, []);

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

export default useMatchSocket;
