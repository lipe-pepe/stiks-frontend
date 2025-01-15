import { Flex, Image } from "@chakra-ui/react";
import React from "react";

interface HandProps {
  tone: string;
  transform: string;
  isCurrentPlayer: boolean; // Se a mão é do jogador que está renderizando a tela
  sticks: number; // Número de palitinhos na mão
}

const Hand: React.FC<HandProps> = ({
  tone,
  transform,
  isCurrentPlayer,
  sticks,
}: HandProps) => {
  return (
    <Flex position="relative">
      <Image
        transform={transform}
        height={"3rem"}
        width={"3rem"}
        src={`/images/hands/closed_${tone}`}
        alt={`Closed hand`}
      />

      {isCurrentPlayer && (
        <Flex
          position="absolute"
          w={"1.5rem"}
          h={"1.5rem"}
          justifyContent={"center"}
          alignItems={"center"}
          rounded={"full"}
          textColor="black"
          fontSize={["xs"]}
          fontWeight={["semibold"]}
          bgColor="white"
          borderColor="black"
          borderWidth={[2]}
          transform={"translate(50%, 50%)"}
        >
          {sticks}
        </Flex>
      )}
    </Flex>
  );
};

export default Hand;
