import { PlayerGameData } from "@/types/match";

function getPlayerName(playersGameData: PlayerGameData[], id: string) {
  const player = playersGameData.find((p) => p.id === id);
  return player?.name;
}

export default getPlayerName;
