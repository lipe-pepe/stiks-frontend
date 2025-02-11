import deletePlayer from "@/services/players/deletePlayer";
import { Player } from "@/types/player";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { MdOutlinePerson } from "react-icons/md";
import SpecialButton from "../specialButton";

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
      gap={[2, null, 4]}
      color={player != null ? "white" : "base.darkest"}
      borderRadius={16}
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
            fontSize={["md", null, null, "lg"]}
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
              fontFamily={"inter"}
              textAlign={"center"}
              px={[2]}
              rounded={"full"}
            >
              {translations("current_player_tag")}
            </Text>
          )}
        </HStack>
        {player?.role === "host" && (
          <Text fontFamily={"inter"} fontSize={["xs", null, "sm"]}>
            HOST
          </Text>
        )}
        {isHost && player?.id !== savedId && player && (
          <SpecialButton
            text={translations("kick_button")}
            variant={"danger"}
            size={["xs", null, "sm"]}
            onClick={() => {
              handleKick();
            }}
          />
        )}
      </VStack>
    </HStack>
  );
};

export default PlayerLobbyDisplay;
