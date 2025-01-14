import { Player } from "@/types/player";
import { Flex, Image, Text } from "@chakra-ui/react";

interface PlayerGameDisplayProps {
  player: Player;
  translations: any;
}
const PlayerGameDisplay: React.FC<PlayerGameDisplayProps> = ({
  player,
  translations,
}: PlayerGameDisplayProps) => {
  return (
    <Flex
      my={["1.5rem"]}
      position={"relative"}
      gap={["0.5rem"]}
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
        {player.gameData.chosen == null && (
          <Text>{translations("choosing")}</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default PlayerGameDisplay;
