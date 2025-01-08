import { Match } from "./match";
import { Player } from "./player";

enum RoomStatus {
  in_lobby,
  in_game,
}

export interface Room {
  code: string; // Código da sala
  players: Player[]; // Lista de jogadores
  match: Match;
  status: RoomStatus;
}
