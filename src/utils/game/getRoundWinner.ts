import { Match } from "@/types/match";

function getRoundWinner(match: Match) {
  const totalChosen = match.playersGameData.reduce(
    (accumulator, player) => accumulator + (player?.chosen || 0),
    0
  );
  const winner = match.playersGameData.find((p) => p.guess === totalChosen);
  return winner?.id;
}

export default getRoundWinner;
