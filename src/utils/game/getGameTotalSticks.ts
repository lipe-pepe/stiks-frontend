import { Player } from "@/types/player";

function getGameTotalSticks(players: Player[]) {
  return players.reduce(
    (accumulator, player) => accumulator + player.gameData.total,
    0
  );
}
export default getGameTotalSticks;
