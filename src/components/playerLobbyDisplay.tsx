import deletePlayer from "@/services/players/deletePlayer";
import { Player } from "@/types/player";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { SlOptions } from "react-icons/sl";

interface PlayerLobbyDisplayProps {
  player: Player | null;
  isCurrentPlayer: boolean;
  isHost: boolean;
  translations: any;
  onKick: () => void;
}
const PlayerLobbyDisplay: React.FC<PlayerLobbyDisplayProps> = ({
  player,
  isCurrentPlayer,
  isHost,
  translations,
  onKick,
}: PlayerLobbyDisplayProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

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
    <Flex
      alignItems={"center"}
      justifyContent={player != null ? "space-between" : "normal"}
      color={player != null ? "white" : "base.darkest"}
    >
      <Flex alignItems={"center"} gap={["1rem"]}>
        {player != null ? (
          <Image
            height={"5rem"}
            src={`/images/avatars/${player.avatar}`}
            alt={`Player ${player.name} avatar`}
          />
        ) : (
          <MdOutlinePerson size={"4.75rem"} />
        )}
        <Flex flexDir={"column"} gap={[2]}>
          <Flex gap={[3]}>
            <Text
              fontSize={["sm"]}
              fontStyle={player != null ? "italic" : "normal"}
              fontWeight={player != null ? "semibold" : "normal"}
              textTransform={player != null ? "none" : "uppercase"}
            >
              {player?.name || translations("empty_player")}
            </Text>
            {isCurrentPlayer && (
              <Text
                bgColor={"blue.base"}
                textColor={"white"}
                fontSize={["xs"]}
                textAlign={"center"}
                px={[2]}
                borderRadius={[8]}
              >
                {translations("current_player_tag")}
              </Text>
            )}
          </Flex>
          {player?.role === "host" && <Text fontSize={["xs"]}>HOST</Text>}
          {showOptions && (
            <Button
              onClick={() => {
                handleKick();
              }}
              size={["xs"]}
              bgColor={"red.base"}
            >
              {translations("kick_button")}
            </Button>
          )}
        </Flex>
      </Flex>
      {player != null && isHost && !isCurrentPlayer && (
        <SlOptions
          onClick={() => setShowOptions(!showOptions)}
          size={"1.5rem"}
          color="width"
        />
      )}
    </Flex>
  );
};

export default PlayerLobbyDisplay;
