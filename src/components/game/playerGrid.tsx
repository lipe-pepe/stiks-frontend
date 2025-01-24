import { PlayerGameData } from "@/types/match";
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import PlayerMatchDisplay from "./playerMatchDisplay";
import { Player } from "@/types/player";
import WinnerDisplay from "./winnerDisplay";

interface PlayerGridProps {
  players: PlayerGameData[];
  winners?: Player[];
}

const PlayerGrid: React.FC<PlayerGridProps> = ({
  players,
  winners,
}: PlayerGridProps) => {
  const totalPlayers = players.length + Number(winners?.length);
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
        />
      ))}
      {winners?.map((p, index) => (
        <WinnerDisplay
          key={`Winner ${index}`}
          player={p}
          position={index}
          handPos={players.length + index < totalPlayers / 2 ? "bottom" : "top"}
        />
      ))}
    </SimpleGrid>
  );
};

export default PlayerGrid;
