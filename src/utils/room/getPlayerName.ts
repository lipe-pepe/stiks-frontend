import { Player } from "@/types/player";

function getPlayerName(players: Player[], id: string) {
  const player = players.find((p) => p.id === id);
  return player?.name;
}

export default getPlayerName;
