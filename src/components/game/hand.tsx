import getSavedPlayerId from "@/utils/getSavedPlayerId";
import { Box, Image, Text } from "@chakra-ui/react";

interface HandProps {
  playerId: string;
  chosen?: number;
  revealed: boolean;
  model: string;
  transform: string[];
}

const Hand: React.FC<HandProps> = ({
  playerId,
  chosen,
  revealed,
  model,
  transform,
}: HandProps) => {
  const savedId = getSavedPlayerId();

  return (
    <Box position={"relative"} boxSize={"100%"}>
      <Image
        opacity={chosen != null ? 1 : 0} // Só deve aparecer quando o player tiver escolhido
        boxSize={"100%"}
        maxH={["none", null, "8rem"]}
        transform={transform}
        src={
          revealed
            ? `/images/hands/open_${model}`
            : `/images/hands/closed_${model}`
        }
        alt={revealed ? "Open hand " : "Closed hand"}
      />
      {playerId === savedId && (
        <Text
          position={"absolute"}
          left="50%"
          transform="translate(-50%, 0)"
          color={"base.darkest"}
          fontSize={["sm", null, "md"]}
        >
          {chosen}
        </Text>
      )}
    </Box>
  );
};

export default Hand;
