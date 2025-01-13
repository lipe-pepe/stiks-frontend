enum PlayerRole {
  host = "host",
  player = "player",
}

interface GameData {
  total: number; // O número total de palitos na mão do jogador
  chosen: number; // O número de palitos escolhidos na rodada
  guess: number; // O número de palitos palpitado
}

interface Player {
  _id?: string;
  name: string;
  role: PlayerRole;
  avatar: string;
  stik: string; // O "avatar" do palito escolhido pelo jogador
  gameData: GameData;
}

interface PlayerCreation {
  name: string;
  avatar: string;
  role: PlayerRole;
}

export { PlayerRole };
export type { Player, GameData, PlayerCreation };
