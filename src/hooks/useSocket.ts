import { useRouter } from "@/i18n/routing";
import { ChatMessage } from "@/types/chat";
import { Player } from "@/types/player";
import { Room } from "@/types/room";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (
  roomCode: string,
  setRoomData: React.Dispatch<React.SetStateAction<Room | null>>,
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>
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

    // Ouvir a chegada de novos jogadores na sala
    socketInstance.on("player-joined", (updatedRoom: Room) => {
      setRoomData(updatedRoom); // Atualiza o estado da sala
    });

    socketInstance.on("player-left", (updatedRoom: Room) => {
      console.log("SAIU UM JOGADOR!!!");
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
      router.push(`/room/${roomCode}/game`);
    });

    // --------------------------------------------------------------------------------

    socketInstance.on("player-chose", (data) => {
      setRoomData((prev: Room | null) => {
        // Verifica se 'prev' é válido e tem jogadores
        if (!prev || !prev.players) return prev;

        const updatedPlayers = prev.players.map((p) => {
          if (p._id === data.playerId) {
            return {
              ...p,
              gameData: {
                ...p.gameData,
                chosen: data.value, // Atualiza apenas o campo necessário
              },
            };
          }

          return p; // Retorna o jogador original
        });
        console.log("Todos escolheram: ", allPlayersChose(updatedPlayers));
        // Retorna o novo estado atualizado
        return {
          ...prev,
          players: updatedPlayers, // Atualiza os players no roomData
        };
      });
    });

    setSocket(socketInstance);

    // Limpa o socket ao desmontar
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const allPlayersChose = (players: Player[]) => {
    return players.every(
      (p) => p.gameData.chosen !== null && p.gameData.chosen !== undefined
    );
  };

  return { socket };
};

export default useSocket;
