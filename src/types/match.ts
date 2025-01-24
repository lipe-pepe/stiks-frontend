// Os dados da partida estão somente no frontend e são usados para o estado da página do jogo.
// Eles são atualizados ao se receber um evento no socket com o hook useSocket.

import { Player, PlayerRole } from "./player";

interface PlayerGameData {
  id: string; // Id do jogador
  name: string;
  role: PlayerRole;
  avatar: string;
  total: number; // O número total de palitos na mão do jogador
  chosen?: number; // O número de palitos escolhidos na rodada
  guess?: number; // O número de palitos palpitado
  revealed: boolean;
}

enum MatchStatus {
  choosing = "choosing",
  guessing = "guessing",
  revealing = "revealing",
  results = "results",
  end = "end",
}

export interface Match {
  round: number; // Número da rodada
  status: MatchStatus; // Status da partida
  playersGameData: PlayerGameData[]; // Dados do jogo de cada jogador
  turn: string; // Id do jogador da vez atual
  totalSticks: number; // Quantidade de palitinhos revelados
  winners: Player[];
}

export { MatchStatus };
export type { PlayerGameData };
