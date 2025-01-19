import { ChatMessage } from "@/types/chat";
import { Match, MatchStatus, PlayerGameData } from "@/types/match";
import getNextTurnPlayer from "@/utils/game/getNextTurnPlayer";
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
        // Retorna o novo estado atualizado
        return {
          ...prev,
          playersGameData: updatedPlayers,
        };
      });
      updateStatus();
    });

    socketInstance.on("player-guessed", (data) => {
      setMatchData((prev) => {
        const updatedPlayers = prev.playersGameData.map((p) => {
          if (p.id === data.playerId) {
            return {
              ...p,
              guess: data.value,
            };
          }
          return p; // Retorna o jogador original
        });

        // Retorna o novo estado atualizado
        return {
          ...prev,
          playersGameData: updatedPlayers,
          turn: getNextTurnPlayer(prev.turn, prev.playersGameData),
        };
      });
      updateStatus();
    });

    socketInstance.on("player-revealed", (data) => {
      setMatchData((prev) => {
        let sticksToSum = 0;
        const updatedPlayers = prev.playersGameData.map((p) => {
          if (p.id === data.playerId) {
            sticksToSum += Number(p.chosen);
            return {
              ...p,
              revealed: true,
            };
          }
          return p; // Retorna o jogador original
        });

        // Retorna o novo estado atualizado
        return {
          ...prev,
          totalSticks: prev.totalSticks + sticksToSum, // Soma os palitos revelados
          playersGameData: updatedPlayers,
          turn: getNextTurnPlayer(prev.turn, prev.playersGameData),
        };
      });
      updateStatus();
    });

    socketInstance.on("next-round", (data) => {
      setMatchData((prev) => {
        const updatedPlayers = prev.playersGameData.map((p) => {
          return {
            ...p,
            chosen: undefined,
            guess: undefined,
            revealed: false,
            total: p.id === data.winnerId ? p.total - 1 : p.total,
          };
        });

        // Pula 2 jogadores para a próxima vez
        const newTurnPlayer = getNextTurnPlayer(
          getNextTurnPlayer(prev.turn, prev.playersGameData),
          prev.playersGameData
        );
        return {
          ...prev,
          turn: newTurnPlayer,
          round: prev.round + 1,
          playersGameData: updatedPlayers,
          status: MatchStatus.choosing,
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

  const checkAllPlayersChose = (players: PlayerGameData[]) => {
    return players.every((p) => p.chosen != null);
  };

  const checkAllPlayersGuessed = (players: PlayerGameData[]) => {
    return players.every((p) => p.guess != null);
  };

  const checkAllPlayersRevealed = (players: PlayerGameData[]) => {
    return players.every((p) => p.revealed == true);
  };

  const updateStatus = () => {
    setMatchData((prev) => {
      if (prev.status === MatchStatus.choosing) {
        return {
          ...prev,
          status: checkAllPlayersChose(prev.playersGameData)
            ? MatchStatus.guessing
            : MatchStatus.choosing,
        };
      } else if (prev.status === MatchStatus.guessing) {
        return {
          ...prev,
          status: checkAllPlayersGuessed(prev.playersGameData)
            ? MatchStatus.revealing
            : MatchStatus.guessing,
        };
      } else if (prev.status === MatchStatus.revealing) {
        return {
          ...prev,
          status: checkAllPlayersRevealed(prev.playersGameData)
            ? MatchStatus.results
            : MatchStatus.revealing,
        };
      }
      return prev;
    });
  };

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
