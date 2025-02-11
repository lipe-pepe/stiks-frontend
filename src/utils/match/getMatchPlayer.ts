import { PlayerGameData } from "@/types/match";

function getMatchPlayer(players: PlayerGameData[], id: string) {
  const player = players.find((p) => p.id === id);
  return player;
}

export default getMatchPlayer;
