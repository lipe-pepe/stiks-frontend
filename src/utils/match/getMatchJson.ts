import { Match, PlayerGameData } from "@/types/match";

/* eslint-disable @typescript-eslint/no-explicit-any */
function getMatchJson(match: any): Match {
  const players: PlayerGameData[] = match.playersData.map((p: any) => {
    return {
      id: p.player._id,
      name: p.player.name,
      role: p.player.role,
      avatar: p.player.avatar,
      total: p.total,
      chosen: p.chosen,
      guess: p.guess,
      revealed: p.revealed,
    };
  });
  return {
    id: match._id,
    round: match.round,
    status: match.status,
    playersGameData: players,
    turn: match?.turn,
    totalSticks: match.totalSticks,
    winners: [],
  };
}

export default getMatchJson;
