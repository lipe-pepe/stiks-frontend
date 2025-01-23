import { PlayerGameData } from "@/types/match";

function getAvailableGuesses(players: PlayerGameData[]) {
  const totalSum = players.reduce((sum, player) => sum + player.total, 0);
  const fullList = Array.from({ length: totalSum + 1 }, (_, index) => index);
  const guessedValues = players
    .map((player) => player.guess) // Extrai os valores de "guess"
    .filter((value) => value !== undefined); // Remove undefined
  const filteredList = fullList.filter(
    (value) => !guessedValues.includes(value)
  );
  return filteredList;
}

export default getAvailableGuesses;
