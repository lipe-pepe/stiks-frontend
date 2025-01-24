import { Player } from "@/types/player";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  Center,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Hand from "./hand";

interface WinnerDisplayProps {
  player: Player;
  position: number;
  handPos?: "top" | "bottom";
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({
  player,
  position,
  handPos = "bottom",
}: WinnerDisplayProps) => {
  const id = getSavedPlayerId();
  const t = useTranslations("PlayerDisplay");

  const medals = ["🥇", "🥈", "🥉"];

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
        <Center opacity={0} display={["none", null, "flex"]} h={["50%"]}>
          <Hand
            transform={["none"]}
            chosen={0}
            playerId={player.id}
            revealed={false}
            model={player.avatar.split("_")[1]}
          />
        </Center>
      )}
      <Center>
        <Image
          maxH={["none", null, "7rem"]}
          src={`/images/avatars/${player.avatar}`}
          alt={`Player ${player.name} avatar`}
        />
      </Center>
      <VStack
        alignItems={["start", null, "center"]}
        textAlign={["start", null, "center"]}
      >
        <HStack flexWrap={"wrap"}>
          {position < medals.length && (
            <Text fontSize={["lg", null, "xl"]}>{medals[position]}</Text>
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
            >
              {t("you_tag")}
            </Text>
          )}
        </HStack>
        <Text fontSize={["md"]} minHeight="1.5em"></Text>
      </VStack>
      {handPos === "bottom" && isGreaterThanSm && (
        <Center h={["50%"]} opacity={0}>
          <Hand
            transform={["rotate(90deg)", "rotate(90deg)", "rotate(180deg)"]}
            chosen={0}
            playerId={player.id}
            revealed={false}
            model={player.avatar.split("_")[1]}
          />
        </Center>
      )}
    </SimpleGrid>
  );
};

export default WinnerDisplay;
