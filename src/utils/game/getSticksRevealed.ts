import { Match } from "@/types/match";

function getSticksRevealed(match: Match) {
  const sticks = match.playersGameData.reduce(
    (accumulator, player) =>
      player.revealed ? accumulator + (player?.chosen || 0) : accumulator + 0,
    0
  );
  return sticks;
}

export default getSticksRevealed;
