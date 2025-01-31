import { Center } from "@chakra-ui/react";

interface NumberCircleProps {
  number: number;
  size: string[];
  color: string;
  bgColor: string;
  onClick: () => void;
  borderWidth?: number[];
  borderColor?: string;
  cursor?: string;
  hoverBgColor: string;
}

const NumberCircle: React.FC<NumberCircleProps> = ({
  number,
  size,
  color,
  bgColor,
  onClick,
  borderWidth = [0],
  borderColor = "none",
  cursor = "auto",
  hoverBgColor,
}: NumberCircleProps) => {
  return (
    <Center
      boxSize={size}
      color={color}
      bg={bgColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      rounded={"full"}
      fontSize={"lg"}
      onClick={onClick}
      cursor={cursor}
      fontFamily={"inter"}
      _hover={{
        bg: hoverBgColor,
        transform: "scale(1.05)", // Cresce 5% no hover
        transition: "transform 0.2s ease-in-out, ease-in-out", // Adiciona suavidade à animação
      }}
    >
      {number}
    </Center>
  );
};

export default NumberCircle;
