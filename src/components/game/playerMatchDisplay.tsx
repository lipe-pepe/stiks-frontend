import { MatchStatus, PlayerGameData } from "@/types/match";
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
import { useEffect, useState } from "react";

interface PlayerMatchDisplayProps {
  player: PlayerGameData;
  handPos?: "top" | "bottom";
  matchStatus: MatchStatus;
}

const PlayerMatchDisplay: React.FC<PlayerMatchDisplayProps> = ({
  player,
  handPos = "bottom",
  matchStatus,
}: PlayerMatchDisplayProps) => {
  const id = getSavedPlayerId();
  const t = useTranslations("PlayerDisplay");
  const [winner, setWinner] = useState<boolean>(false);

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

  useEffect(() => {
    setWinner(player.position !== null);
  }, [player]);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <SimpleGrid spacing={["1rem"]} columns={[3, null, 1]} alignItems={"center"}>
      {handPos === "top" &&
        isGreaterThanSm &&
        matchStatus != MatchStatus.end && (
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
        {!winner && (
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
              hoverBgColor="base.dark"
            />
          </Box>
        )}
        {player.guess != null && matchStatus != MatchStatus.end && (
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
              fontWeight={"bold"}
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
          {winner && player.position && player.position <= medals.length && (
            <Text fontSize={["lg", null, "xl"]}>
              {medals[player.position - 1]}
            </Text>
          )}
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
              fontFamily={"inter"}
            >
              {t("you_tag")}
            </Text>
          )}
        </HStack>
        {!winner && (
          <Text
            fontFamily={"inter"}
            fontWeight={"normal"}
            fontSize={["sm"]}
            minHeight="1.5em"
          >
            {getStatusText()}
          </Text>
        )}
      </VStack>
      {(handPos === "bottom" || !isGreaterThanSm) &&
        matchStatus != MatchStatus.end && (
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
