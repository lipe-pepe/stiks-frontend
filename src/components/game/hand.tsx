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
      <Box boxSize={"100%"} transform={transform}>
        <Image
          opacity={chosen != null ? 1 : 0} // Só deve aparecer quando o player tiver escolhido
          boxSize={"100%"}
          maxH={["none", null, "8rem"]}
          src={
            revealed
              ? `/images/hands/open_${model}`
              : `/images/hands/closed_${model}`
          }
          alt={revealed ? "Open hand " : "Closed hand"}
        />
        {revealed && chosen != 0 && (
          <Image
            position={"absolute"}
            top={0}
            right={0}
            transform={[
              "translate(40%, 0)",
              null,
              "translate(0%, -10%)",
              "translate(-5%, -10%)",
              "translate(-10%, -10%)",
            ]}
            boxSize={"75%"}
            src={`/images/sticks/sticks_${chosen}.svg`}
            alt={`${chosen} sticks hidden`}
          />
        )}
      </Box>
      {playerId === savedId && !revealed && (
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
