import { PlayerGameData } from "@/types/match";

function getGameGuesses(players: PlayerGameData[]) {
  return players.map((p) => Number(p.guess)) || [];
}
export default getGameGuesses;
