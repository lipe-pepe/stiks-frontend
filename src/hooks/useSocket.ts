import { ChatMessage } from "@/types/chat";
import { Room } from "@/types/room";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (
  roomCode: string,
  setRoomData: React.Dispatch<React.SetStateAction<Room | null>>,
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>
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

    setSocket(socketInstance);

    // Limpa o socket ao desmontar
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket };
};

export default useSocket;
