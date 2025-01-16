import { PlayerGameData } from "@/types/match";

function getNextTurnPlayer(curTurn: string, players: PlayerGameData[]) {
  let i = players.findIndex((p) => p.id === curTurn);
  i++;
  if (i >= players.length) {
    i = 0;
  }
  return players[i].id;
}

export default getNextTurnPlayer;
