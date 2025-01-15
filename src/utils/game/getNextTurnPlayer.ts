import { Player } from "@/types/player";

function getNextTurnPlayer(curTurn: string, players: Player[]) {
  let i = players.findIndex((p) => p._id === curTurn);
  i++;
  if (i >= players.length) {
    i = 0;
  }
  return players[i]._id;
}

export default getNextTurnPlayer;
