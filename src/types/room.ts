import { Player } from "./player";

enum GameStatus {
  choosing = "choosing",
  guessing = "guessing",
  revealing = "revealing",
  results = "results",
}

export interface Room {
  code: string; // Código da sala
  players: Player[]; // Lista de jogadores
  round: number; // Número da rodada
  status: GameStatus; // Status da partida
}

export { GameStatus };
