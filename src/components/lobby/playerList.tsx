import { Player } from "@/types/player";
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import PlayerLobbyDisplay from "./playerLobbyDisplay";
import { useTranslations } from "next-intl";

interface PlayerListProps {
  players: Player[];
  maxPlayers: number;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  maxPlayers,
}: PlayerListProps) => {
  const t = useTranslations("PlayerList");
  return (
    <SimpleGrid w={"100%"} columns={[1, null, null, 2]}>
      {players.map((player, index) => (
        <PlayerLobbyDisplay key={index} player={player} translations={t} />
      ))}
      {Array.from({ length: maxPlayers - players.length }, (_, index) => (
        <PlayerLobbyDisplay key={index} player={null} translations={t} />
      ))}
    </SimpleGrid>
  );
};

export default PlayerList;
