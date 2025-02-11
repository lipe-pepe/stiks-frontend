import { PlayerGameData } from "@/types/match";

function getMatchPlayerName(players: PlayerGameData[], id: string) {
  const player = players.find((p) => p.id === id);
  return player?.name;
}

export default getMatchPlayerName;
