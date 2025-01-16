import { Socket } from "socket.io-client";

function matchEvents(socketInstance: Socket) {
  socketInstance.on("player-chose", (data) => {
    console.log(data);
  });
  //   socketInstance.on("player-chose", (data) => {
  //     setRoomData((prev: Room | null) => {
  //       // Verifica se 'prev' é válido e tem jogadores
  //       if (!prev || !prev.players) return prev;
  //       const updatedPlayers = prev.players.map((p) => {
  //         if (p._id === data.playerId) {
  //           return {
  //             ...p,
  //             gameData: {
  //               ...p.gameData,
  //               chosen: data.value, // Atualiza apenas o campo necessário
  //             },
  //           };
  //         }
  //         return p; // Retorna o jogador original
  //       });
  //       // Retorna o novo estado atualizado
  //       return {
  //         ...prev,
  //         gameData: {
  //           round: prev.gameData?.round,
  //           status: allPlayersChose(updatedPlayers)
  //             ? GameStatus.guessing
  //             : GameStatus.choosing,
  //           turn: updatedPlayers[0]._id,
  //           totalSticks: 0,
  //           revealed: [],
  //         },
  //         players: updatedPlayers, // Atualiza os players no roomData
  //       };
  //     });
  //   });
  //   // --------------------------------------------------------------------------------
  //   socketInstance.on("player-guessed", (data) => {
  //     nextTurn();
  //     setRoomData((prev: Room | null) => {
  //       // Verifica se 'prev' é válido e tem jogadores
  //       if (!prev || !prev.players) return prev;
  //       const updatedPlayers = prev.players.map((p) => {
  //         if (p._id === data.playerId) {
  //           return {
  //             ...p,
  //             gameData: {
  //               ...p.gameData,
  //               guess: data.value, // Atualiza apenas o campo necessário
  //             },
  //           };
  //         }
  //         return p; // Retorna o jogador original
  //       });
  //       // Retorna o novo estado atualizado
  //       return {
  //         ...prev,
  //         status: allPlayersGuessed(updatedPlayers)
  //           ? GameStatus.revealing
  //           : GameStatus.guessing,
  //         players: updatedPlayers, // Atualiza os players no roomData
  //       };
  //     });
  //   });
  //   // --------------------------------------------------------------------------------
  //   socketInstance.on("player-revealed", () => {
  //     nextTurn();
  //   });
}

export default matchEvents;
