import { PlayerGameData } from "@/types/match";
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import PlayerMatchDisplay from "./playerMatchDisplay";

interface PlayerGridProps {
  players: PlayerGameData[];
}

const PlayerGrid: React.FC<PlayerGridProps> = ({
  players,
}: PlayerGridProps) => {
  return (
    <SimpleGrid
      bg={"purple"}
      h={"100%"}
      spacing={["1rem"]}
      columns={[1, null, Math.ceil(players.length / 2)]}
    >
      {players.map((p, index) => (
        <PlayerMatchDisplay key={index} player={p} />
      ))}
    </SimpleGrid>
  );
};

export default PlayerGrid;
