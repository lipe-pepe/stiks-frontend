import { PlayerGameData } from "@/types/match";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  Box,
  Center,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NumberCircle from "../numberCircle";
import Hand from "./hand";

interface PlayerMatchDisplayProps {
  player: PlayerGameData;
  handPos?: "top" | "bottom";
}

const PlayerMatchDisplay: React.FC<PlayerMatchDisplayProps> = ({
  player,
  handPos = "bottom",
}: PlayerMatchDisplayProps) => {
  const id = getSavedPlayerId();
  const t = useTranslations("PlayerDisplay");

  const getStatusText = () => {
    if (player.chosen == null) {
      return t("choosing");
    }
    return null;
  };

  // Retorna true apenas para breakpoints maiores que "md"
  const isGreaterThanSm = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
    "2xl": true,
  });

  return (
    <SimpleGrid spacing={["1rem"]} columns={[3, null, 1]} alignItems={"center"}>
      {handPos === "top" && isGreaterThanSm && (
        <Center display={["none", null, "flex"]} h={["50%"]}>
          <Hand
            transform={["none"]}
            chosen={player.chosen}
            playerId={player.id}
            revealed={player.revealed}
            model={player.avatar.split("_")[1]}
          />
        </Center>
      )}
      <Center position={"relative"}>
        <Image
          maxH={["none", null, "7rem"]}
          src={`/images/avatars/${player.avatar}`}
          alt={`Player ${player.name} avatar`}
        />
        <Box
          pos={"absolute"}
          bottom={0}
          left={[0, null, "50%"]}
          transform={[null, null, "translate(-200%, 0)"]}
        >
          <NumberCircle
            number={player.total}
            size={["2rem"]}
            color={"white"}
            bgColor={"base.dark"}
            onClick={() => {}}
            borderColor="black"
            borderWidth={[2, 2, 2, 3]}
          />
        </Box>
        {player.guess != null && (
          <Box
            pos={"absolute"}
            boxSize={"50%"}
            top={"-20%"}
            right={["-20%", null, "50%"]}
            transform={[null, null, "translate(70%, 0)", "translate(65%, 0)"]}
          >
            <Image
              boxSize={"100%"}
              src={`/images/match/balloon.svg`}
              alt={`Player ${player.name} speech balloon`}
            />
            <Text
              position={"absolute"}
              top="50%"
              left="50%"
              transform="translate(-45%, -55%)"
              fontSize={"lg"}
              color={"black"}
              fontWeight={"semibold"}
            >
              {player.guess}
            </Text>
          </Box>
        )}
      </Center>
      <VStack
        alignItems={["start", null, "center"]}
        textAlign={["start", null, "center"]}
      >
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
        <Text fontSize={["md"]} minHeight="1.5em">
          {getStatusText()}
        </Text>
      </VStack>
      {(handPos === "bottom" || !isGreaterThanSm) && (
        <Center h={["50%"]}>
          <Hand
            transform={["rotate(90deg)", "rotate(90deg)", "rotate(180deg)"]}
            chosen={player.chosen}
            playerId={player.id}
            revealed={player.revealed}
            model={player.avatar.split("_")[1]}
          />
        </Center>
      )}
    </SimpleGrid>
  );
};

export default PlayerMatchDisplay;
