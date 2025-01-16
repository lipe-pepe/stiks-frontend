import { Player } from "@/types/player";

/* eslint-disable @typescript-eslint/no-explicit-any */
function getRoomJson(room: any) {
  const players: Player[] = room.players.map((p: any) => {
    return {
      id: p._id,
      name: p.name,
      avatar: p.avatar,
      role: p.role,
    };
  });
  return {
    code: room.code,
    players: players,
  };
}

export default getRoomJson;
