import { PlayerGameData } from "@/types/match";

function getGameTotalSticks(players: PlayerGameData[]) {
  return players.reduce((accumulator, player) => accumulator + player.total, 0);
}
export default getGameTotalSticks;
