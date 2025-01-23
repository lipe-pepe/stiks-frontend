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
      boxSize={"100%"}
      spacing={["1rem"]}
      columns={[3]}
      alignItems={"center"}
    >
      <Box
        position={"relative"}
        // bg={"teal"} //DEBUG
      >
        <Image
          boxSize={"100%"}
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
          <Text fontStyle={"italic"} fontWeight={700} fontSize={["md"]}>
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
        // bg={"teal"} //debug
        h={["50%"]}
      >
        <Image
          boxSize={["100%"]}
          objectFit={"contain"}
          transform={["rotate(90deg)"]}
          src={
            player.revealed
              ? `/images/hands/open_${tone}`
              : `/images/hands/closed_${tone}`
          }
          alt={player.revealed ? "Open hand " : "Closed hand"}
        />
      </Center>
    </SimpleGrid>
    // <Flex
    //   h={"100%"}
    //   w={"100%"}
    //   flexDir={["row"]}
    //   gap={["1rem"]}
    //   alignItems={["center"]}
    // >
    //   <Box boxSize={["6rem"]} position={"relative"}>
    //     <Image
    //       boxSize={"100%"}
    //       src={`/images/avatars/${player.avatar}`}
    //       alt={`Player ${player.name} avatar`}
    //     />
    //     <Box pos={"absolute"} bottom={0}>
    //       <NumberCircle
    //         number={player.total}
    //         size={["2rem"]}
    //         color={"white"}
    //         bgColor={"base.dark"}
    //         onClick={() => {}}
    //         borderColor="black"
    //         borderWidth={2}
    //       />
    //     </Box>
    //   </Box>
    //   <VStack alignItems={["start"]}>
    //     <HStack>
    //       <Text fontStyle={"italic"} fontWeight={700} fontSize={["md"]}>
    //         {player.name}
    //       </Text>
    //       {player.id === id && (
    //         <Text
    //           rounded={"full"}
    //           px={[1]}
    //           bgColor={"blue.base"}
    //           fontSize={["xs"]}
    //         >
    //           {t("you_tag")}
    //         </Text>
    //       )}
    //     </HStack>
    //     <Text fontSize={["md"]}>{getStatusText()}</Text>
    //   </VStack>
    //   <Image
    //     transform={["rotate(90deg)"]}
    //     height={"3rem"}
    //     width={"3rem"}
    //     src={
    //       player.revealed
    //         ? `/images/hands/open_${tone}`
    //         : `/images/hands/closed_${tone}`
    //     }
    //     alt={player.revealed ? "Open hand " : "Closed hand"}
    //   />
    // </Flex>
  );
};

export default PlayerMatchDisplay;
