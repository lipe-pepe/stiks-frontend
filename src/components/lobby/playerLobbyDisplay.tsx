import deletePlayer from "@/services/players/deletePlayer";
import { Player } from "@/types/player";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlinePerson } from "react-icons/md";

interface PlayerLobbyDisplayProps {
  player: Player | null;
  isHost: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: any;
  onKick: () => void;
}
const PlayerLobbyDisplay: React.FC<PlayerLobbyDisplayProps> = ({
  player,
  isHost,
  translations,
  onKick,
}: PlayerLobbyDisplayProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const savedId = getSavedPlayerId();

  const handleKick = async () => {
    try {
      const response = await deletePlayer(String(player?.id));
      if (response.status === 200) {
        onKick();
      }
    } catch (error) {
      console.log("An error ocurred leaving the room: ", error);
    }
  };

  return (
    <HStack
      px={[4, null, 6]}
      py={2}
      onClick={() => {
        if (isHost && player?.id !== savedId && player)
          setShowOptions(!showOptions);
      }}
      bg={showOptions ? "base.transparent" : "none"}
      color={player != null ? "white" : "base.darkest"}
      cursor={isHost && player && player?.id != savedId ? "pointer" : "default"}
      borderRadius={16}
      _hover={
        isHost && player && player?.id != savedId
          ? {
              bgColor: "base.transparent",
              transition: "bgColor 0.2s ease-in-out", // Adiciona suavidade à animação
            }
          : {}
      }
    >
      {player != null ? (
        <Image
          boxSize={["5rem", null, "6rem", "7rem", "8rem"]}
          src={`/images/avatars/${player.avatar}`}
          alt={`Player ${player.name} avatar`}
        />
      ) : (
        <Box boxSize={["5rem"]}>
          <MdOutlinePerson size={"100%"} />
        </Box>
      )}
      <VStack alignItems={"start"}>
        <HStack>
          <Text
            fontSize={["sm", null, "md"]}
            fontStyle={player != null ? "italic" : "normal"}
            fontWeight={player != null ? "semibold" : "normal"}
            textTransform={player != null ? "none" : "uppercase"}
          >
            {player?.name || translations("empty_player")}
          </Text>
          {player?.id === savedId && (
            <Text
              bgColor={"blue.base"}
              textColor={"white"}
              fontSize={["xs", null, "sm"]}
              textAlign={"center"}
              px={[2]}
              borderRadius={[8]}
            >
              {translations("current_player_tag")}
            </Text>
          )}
        </HStack>
        {player?.role === "host" && (
          <Text fontSize={["xs", null, "sm"]}>HOST</Text>
        )}
        {showOptions && (
          <Button
            onClick={() => {
              handleKick();
            }}
            size={["xs", null, "sm"]}
            variant={"danger"}
          >
            {translations("kick_button")}
          </Button>
        )}
      </VStack>
    </HStack>
  );
};

export default PlayerLobbyDisplay;
