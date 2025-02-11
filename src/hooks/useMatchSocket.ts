import { ChatLog, ChatMessage } from "@/types/chat";
import { Match, MatchStatus } from "@/types/match";
import getNextTurnPlayer from "@/utils/game/getNextTurnPlayer";
import getMatchJson from "@/utils/match/getMatchJson";
import getMatchPlayerName from "@/utils/match/getMatchPlayerName";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useMatchSocket = (
  setChat: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setMatchData: React.Dispatch<React.SetStateAction<Match | null>>
) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  // Configurar Socket.io
  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_BACKEND_HOST);

    socketInstance.on("disconnect", () => {
      console.log("Socket desconectado com ID: ", socketInstance.id);
    });

    socketInstance.on("match-update", (data) => {
      setMatchData(getMatchJson(data)); // Atualiza o estado da sala
    });

    socketInstance.on("player-chose", (match, playerId) => {
      const newMatchData = getMatchJson(match);
      setMatchData(newMatchData); // Atualiza o estado da sala

      // Cria o log no chat
      const playerName = getMatchPlayerName(
        newMatchData.playersGameData,
        playerId
      );
      const newLog: ChatLog = {
        player: String(playerName),
        type: "game",
        message: "log_player_chose",
      };
      setChat((prevChat) => [...prevChat, newLog]);
    });

    socketInstance.on("chat-message-received", (data) => {
      const newMessage: ChatMessage = {
        player: data.player,
        message: data.message,
      };
      setChat((prevChat: ChatMessage[]) => [...prevChat, newMessage]);
    });

    socketInstance.on("next-round", (data) => {
      setMatchData((prev) => {
        if (!prev) return prev;
        const updatedPlayers = prev.playersGameData.map((p) => {
          return {
            ...p,
            chosen: undefined,
            guess: undefined,
            revealed: false,
            total: p.id === data.winnerId ? p.total - 1 : p.total,
          };
        });
        const winners = updatedPlayers.filter((p) => p.total == 0);
        const remainingPlayers = updatedPlayers.filter((p) => p.total != 0);

        // Pula 2 jogadores para a próxima vez
        const newTurnPlayer =
          prev.playersGameData.length > 2
            ? getNextTurnPlayer(
                getNextTurnPlayer(prev.turn, prev.playersGameData),
                prev.playersGameData
              )
            : getNextTurnPlayer(prev.turn, prev.playersGameData);

        return {
          ...prev,
          turn: newTurnPlayer,
          round: prev.round + 1,
          playersGameData: remainingPlayers,
          status:
            remainingPlayers.length > 1
              ? MatchStatus.choosing
              : MatchStatus.end,
          winners: winners,
        };
      });
    });

    setSocket(socketInstance);

    // Limpa o socket ao desmontar
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // ---------------------------------------------------------------------------------------

  return { socket };
};

export default useMatchSocket;
