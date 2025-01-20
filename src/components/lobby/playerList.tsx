import { Player } from "@/types/player";
import { VStack } from "@chakra-ui/react";
import React from "react";
import PlayerLobbyDisplay from "./playerLobbyDisplay";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import { useTranslations } from "next-intl";

interface PlayerListProps {
  players: Player[];
  maxPlayers: number;
  isHost: boolean;
  onKickPlayer: () => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  players,
  maxPlayers,
  isHost,
  onKickPlayer,
}: PlayerListProps) => {
  const t = useTranslations("PlayerList");
  return (
    <VStack alignItems={"start"} gap={["2rem"]}>
      {players.map((player, index) => (
        <PlayerLobbyDisplay
          key={index}
          player={player}
          isHost={isHost}
          translations={t}
          isCurrentPlayer={player.id === getSavedPlayerId()}
          onKick={onKickPlayer}
        />
      ))}
      {Array.from({ length: maxPlayers - players.length }, (_, index) => (
        <PlayerLobbyDisplay
          isHost={isHost}
          key={index}
          player={null}
          translations={t}
          isCurrentPlayer={false}
          onKick={onKickPlayer}
        />
      ))}
    </VStack>
  );
};

export default PlayerList;
