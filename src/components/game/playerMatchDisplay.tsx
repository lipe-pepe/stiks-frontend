import { PlayerGameData } from "@/types/match";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  Box,
  Center,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NumberCircle from "../numberCircle";
import { useEffect, useState } from "react";

interface PlayerMatchDisplayProps {
  player: PlayerGameData;
}

const PlayerMatchDisplay: React.FC<PlayerMatchDisplayProps> = ({
  player,
}: PlayerMatchDisplayProps) => {
  const id = getSavedPlayerId();
  const t = useTranslations("PlayerDisplay");
  const [tone, setTone] = useState<string>();

  useEffect(() => {
    const skinTone = player.avatar.split("_")[1];
    setTone(skinTone);
  }, [player]);

  const getStatusText = () => {
    if (player.chosen == null) {
      return t("choosing");
    }
    return null;
  };
  return (
    <SimpleGrid
      spacing={["1rem"]}
      columns={[3, null, 1]}
      alignItems={"center"}
      bg={"teal"}
    >
      <Box
        position={"relative"}
        // bg={"teal"} //DEBUG
      >
        <Image
          src={`/images/avatars/${player.avatar}`}
          alt={`Player ${player.name} avatar`}
        />
        <Box pos={"absolute"} bottom={0}>
          <NumberCircle
            number={player.total}
            size={["2rem"]}
            color={"white"}
            bgColor={"base.dark"}
            onClick={() => {}}
            borderColor="black"
            borderWidth={2}
          />
        </Box>
      </Box>
      <VStack alignItems={["start"]}>
        <HStack flexWrap={"wrap"}>
          <Text
            fontStyle={"italic"}
            fontWeight={700}
            fontSize={["md", null, "lg"]}
          >
            {player.name}
          </Text>
          {player.id === id && (
            <Text
              rounded={"full"}
              px={[1]}
              bgColor={"blue.base"}
              fontSize={["xs"]}
            >
              {t("you_tag")}
            </Text>
          )}
        </HStack>
        <Text fontSize={["md"]}>{getStatusText()}</Text>
      </VStack>
      <Center
        position={"relative"}
        h={["50%"]}
        // bg={"teal"} //debug
      >
        {/* {player.chosen != null && ( */}
        <Image
          boxSize={"100%"}
          transform={["rotate(90deg)"]}
          src={
            player.revealed
              ? `/images/hands/open_${tone}`
              : `/images/hands/closed_${tone}`
          }
          alt={player.revealed ? "Open hand " : "Closed hand"}
        />
        {/* )} */}
      </Center>
    </SimpleGrid>
  );
};

export default PlayerMatchDisplay;
