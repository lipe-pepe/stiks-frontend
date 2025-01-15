import { Player } from "@/types/player";
import { GameStatus } from "@/types/room";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Hand from "./hand";

interface PlayerGameDisplayProps {
  player: Player;
  currentPlayerId: string; // Id do jogador que está renderizando a tela
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: any;
  turn: string;
  gameStatus: GameStatus | undefined;
}
const PlayerGameDisplay: React.FC<PlayerGameDisplayProps> = ({
  player,
  currentPlayerId,
  translations,
  turn,
  gameStatus,
}: PlayerGameDisplayProps) => {
  const [tone, setTone] = useState<string>();

  useEffect(() => {
    const skinTone = player.avatar.split("_")[1];
    setTone(skinTone);
  }, [player]);

  return (
    <Flex
      my={["1rem"]}
      position={"relative"}
      gap={["1rem"]}
      alignItems={"center"}
    >
      <Image
        height={"5rem"}
        src={`/images/avatars/${player.avatar}`}
        alt={`Player ${player.name} avatar`}
      />
      <Flex
        position={"absolute"}
        bottom={0}
        width={["1.5rem"]}
        height={["1.5rem"]}
        bgColor={"base.darkest"}
        justifyContent={"center"}
        rounded={"full"}
        borderWidth={[1]}
        borderColor={"black"}
      >
        <Text fontWeight={"semibold"} fontSize={["sm"]}>
          {player.gameData.total}
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text fontSize={["sm"]} fontStyle={"italic"} fontWeight={"semibold"}>
          {player.name}
        </Text>
        {player.gameData.chosen == null &&
          gameStatus === GameStatus.choosing && (
            <Text>{translations("choosing")}</Text>
          )}
        {turn === player._id && gameStatus === GameStatus.guessing && (
          <Text>{translations("guessing")}</Text>
        )}
        {gameStatus === GameStatus.guessing &&
          player.gameData.guess != null && (
            <Text>
              {translations("guess", { number: player.gameData.guess })}
            </Text>
          )}
      </Flex>
      {player.gameData.chosen != null && (
        <Flex position={"absolute"} right={0}>
          <Hand
            transform="rotate(90deg)"
            sticks={player.gameData.chosen}
            tone={String(tone)}
            isCurrentPlayer={player._id === currentPlayerId}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default PlayerGameDisplay;
