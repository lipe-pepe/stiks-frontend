import { Center } from "@chakra-ui/react";

interface NumberCircleProps {
  number: number;
  size: string[];
  color: string;
  bgColor: string;
  onClick: () => void;
  borderWidth?: number[];
  borderColor?: string;
}

const NumberCircle: React.FC<NumberCircleProps> = ({
  number,
  size,
  color,
  bgColor,
  onClick,
  borderWidth = [0],
  borderColor = "none",
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
    >
      {number}
    </Center>
  );
};

export default NumberCircle;
