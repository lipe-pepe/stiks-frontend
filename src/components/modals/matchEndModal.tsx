import { useRouter } from "@/i18n/routing";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  HStack,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import SpecialButton from "../specialButton";
import { PlayerGameData } from "@/types/match";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useSound from "use-sound";

interface MatchEndProps {
  isOpen: boolean;
  onClose: () => void;
  playersGameData: PlayerGameData[];
}

const MatchEndModal: React.FC<MatchEndProps> = ({
  isOpen,
  onClose,
  playersGameData,
}: MatchEndProps) => {
  const t = useTranslations("MatchEndModal");
  const { roomCode } = useParams();
  const savedId = getSavedPlayerId();
  const router = useRouter();
  const [player, setPlayer] = useState<PlayerGameData>();

  const [playLose] = useSound("/sounds/lose.mp3");
  const [playWin] = useSound("/sounds/win.mp3");
  const [playEnd] = useSound("/sounds/lose.mp3");
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);

  const playSound = () => {
    if (player?.position === 1) {
      playWin();
    } else if (player?.position == null) {
      playLose();
    } else {
      playEnd();
    }
    setHasPlayed(true);
  };

  // Atualiza o player
  useEffect(() => {
    setPlayer(playersGameData.find((p) => p.id === savedId));
  }, [playersGameData, savedId]);

  // Efeito sonoro
  useEffect(() => {
    if (isOpen && !hasPlayed) {
      playSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, isOpen, hasPlayed]);

  const getTitle = () => {
    if (player?.position === 1) {
      return t("you_won");
    } else if (player?.position == null) {
      return t("you_lost");
    } else {
      const name = playersGameData.find((p) => p.position == null)?.name;
      return t("player_lost", { name: name });
    }
  };

  const getIcon = (position: number) => {
    const medals = ["🥇", "🥈", "🥉"];
    const loser = "💩";

    if (position === playersGameData.length) {
      return loser;
    } else if (position <= medals.length) {
      return medals[position - 1];
    } else {
      return "";
    }
  };

  const handleBackToLobby = () => {
    onClose();
    router.push(`/room/${roomCode}/lobby`);
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW={["auto", "90vw"]}
        minW={["80vw", null, "auto"]}
        w={"auto"}
        borderRadius={[12, null, 16]}
        fontFamily={"quicksand"}
        p={[6, null, 8]}
      >
        <VStack gap={[4]}>
          {/* TITLE */}
          <Text
            textAlign={"center"}
            my={[6]}
            fontSize={["2xl"]}
            fontWeight={"bold"}
          >
            {getTitle()}
          </Text>
          {/* RANKING */}
          <Text
            fontSize={["sm"]}
            textTransform={"uppercase"}
            fontWeight={"medium"}
          >
            {t("ranking")}
          </Text>
          <SimpleGrid
            columns={[1, null, 2]}
            width={"100%"}
            gap={[2]}
            mb={[2, null, 4]}
          >
            {playersGameData.map((p, index) => (
              <HStack
                key={`player_ranking_${index}`}
                w="100%"
                fontWeight={"semibold"}
                fontSize={["md", null, "lg"]}
                borderWidth={[2, null, 3]}
                borderColor={"gray.1"}
                borderRadius={[10, null, 12]}
                p={[4]}
              >
                <Text>{index + 1}.</Text>
                <Text>{getIcon(index + 1)}</Text>
                <Image
                  boxSize={[16, null, 24]}
                  src={`/images/avatars/${p.avatar}`}
                  alt={`Player ${p.name} avatar`}
                />
                <Text fontStyle={"italic"} fontWeight={700}>
                  {p.name}
                </Text>
              </HStack>
            ))}
          </SimpleGrid>
          <SpecialButton
            size={["sm", "md"]}
            text={t("lobby_button")}
            onClick={handleBackToLobby}
          />
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default MatchEndModal;
