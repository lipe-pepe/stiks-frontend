import { Player } from "@/types/player";
import { Room } from "@/types/room";

/* eslint-disable @typescript-eslint/no-explicit-any */
function getRoomJson(room: any): Room {
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
    matchId: room.match,
  };
}

export default getRoomJson;
