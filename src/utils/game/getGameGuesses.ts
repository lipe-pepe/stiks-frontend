import { Player } from "@/types/player";

function getGameGuesses(players: Player[]) {
  return players.map((p) => p.gameData.guess);
}
export default getGameGuesses;
