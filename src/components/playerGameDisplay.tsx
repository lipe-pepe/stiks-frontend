import { MatchStatus, PlayerGameData } from "@/types/match";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Hand from "./hand";

interface PlayerGameDisplayProps {
  playerGameData: PlayerGameData;
  currentPlayerId: string; // Id do jogador que está renderizando a tela
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: any;
  turn: string;
  matchStatus: MatchStatus | undefined;
}
const PlayerGameDisplay: React.FC<PlayerGameDisplayProps> = ({
  playerGameData,
  currentPlayerId,
  translations,
  turn,
  matchStatus,
}: PlayerGameDisplayProps) => {
  const [tone, setTone] = useState<string>();

  useEffect(() => {
    const skinTone = playerGameData.avatar.split("_")[1];
    setTone(skinTone);
  }, [playerGameData]);

  return (
    <Flex
      my={["1rem"]}
      position={"relative"}
      gap={["1rem"]}
      alignItems={"center"}
    >
      <Image
        height={"5rem"}
        src={`/images/avatars/${playerGameData.avatar}`}
        alt={`Player ${playerGameData.name} avatar`}
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
          {playerGameData.total}
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text fontSize={["sm"]} fontStyle={"italic"} fontWeight={"semibold"}>
          {playerGameData.name}
        </Text>
        {playerGameData.chosen == null &&
          matchStatus === MatchStatus.choosing && (
            <Text>{translations("choosing")}</Text>
          )}
        {turn === playerGameData.id && matchStatus === MatchStatus.guessing && (
          <Text>{translations("guessing")}</Text>
        )}
        {matchStatus === MatchStatus.guessing &&
          playerGameData.guess != null && (
            <Text>
              {translations("guess", { number: playerGameData.guess })}
            </Text>
          )}
      </Flex>
      {playerGameData.chosen != null && (
        <Flex position={"absolute"} right={0}>
          <Hand
            transform="rotate(90deg)"
            sticks={playerGameData.chosen}
            tone={String(tone)}
            isCurrentPlayer={playerGameData.id === currentPlayerId}
            open={playerGameData.revealed}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default PlayerGameDisplay;
