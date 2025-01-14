import { Player } from "@/types/player";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface PlayerGameDisplayProps {
  player: Player;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: any;
}
const PlayerGameDisplay: React.FC<PlayerGameDisplayProps> = ({
  player,
  translations,
}: PlayerGameDisplayProps) => {
  const [tone, setTone] = useState<string>();

  useEffect(() => {
    console.log(player.avatar);
    const skinTone = player.avatar.split("_")[1];

    console.log(skinTone);
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
        {player.gameData.chosen == null && (
          <Text>{translations("choosing")}</Text>
        )}
      </Flex>
      {player.gameData.chosen != null && (
        <Flex position={"absolute"} right={0} transform="rotate(90deg)">
          <Image
            height={"3rem"}
            width={"3rem"}
            src={`/images/hands/closed_${tone}`}
            alt={`Closed hand`}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default PlayerGameDisplay;
