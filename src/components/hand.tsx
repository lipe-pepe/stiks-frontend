import { Flex, Image } from "@chakra-ui/react";
import React from "react";

interface HandProps {
  tone: string;
  transform: string;
  isCurrentPlayer: boolean; // Se a mão é do jogador que está renderizando a tela
  sticks: number; // Número de palitinhos na mão
  open: boolean;
}

const Hand: React.FC<HandProps> = ({
  tone,
  transform,
  isCurrentPlayer,
  sticks,
  open,
}: HandProps) => {
  return (
    <Flex position="relative">
      <Image
        transform={transform}
        height={"3rem"}
        width={"3rem"}
        src={
          open ? `/images/hands/open_${tone}` : `/images/hands/closed_${tone}`
        }
        alt={open ? "Open hand " : "Closed hand"}
      />
      {open && (
        <Flex ml={2}>
          {Array.from({ length: sticks }, (_, index) => (
            <Image
              height={"2rem"}
              width={"0.5rem"}
              key={index}
              alt={"Stick image"}
              src="/images/stick.svg"
            />
          ))}
        </Flex>
      )}
      {isCurrentPlayer && !open && (
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
