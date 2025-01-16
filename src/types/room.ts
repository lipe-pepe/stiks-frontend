import { Player } from "./player";

export interface Room {
  code: string; // Código da sala
  players: Player[]; // Lista de jogadores
}
