import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (roomCode: string) => {
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

    setSocket(socketInstance);

    // Limpa o socket ao desmontar
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket };
};

export default useSocket;
