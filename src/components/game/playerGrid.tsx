import { MatchStatus, PlayerGameData } from "@/types/match";
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import PlayerMatchDisplay from "./playerMatchDisplay";

interface PlayerGridProps {
  players: PlayerGameData[];
  matchStatus: MatchStatus;
}

const PlayerGrid: React.FC<PlayerGridProps> = ({
  players,
  matchStatus,
}: PlayerGridProps) => {
  const totalPlayers = players.length;
  return (
    <SimpleGrid
      h={"100%"}
      spacing={["2rem", null, "1rem"]}
      columns={[1, null, Math.ceil(totalPlayers / 2)]}
    >
      {players.map((p, index) => (
        <PlayerMatchDisplay
          key={`Player ${index}`}
          player={p}
          handPos={index < totalPlayers / 2 ? "bottom" : "top"}
          matchStatus={matchStatus}
        />
      ))}
    </SimpleGrid>
  );
};

export default PlayerGrid;
