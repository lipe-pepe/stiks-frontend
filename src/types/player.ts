enum PlayerRole {
  host = "host",
  player = "player",
}

interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  avatar: string;
}

interface PlayerCreation {
  name: string;
  avatar: string;
  role: PlayerRole;
}

export { PlayerRole };
export type { Player, PlayerCreation };
