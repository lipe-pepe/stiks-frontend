import { Center } from "@chakra-ui/react";

interface NumberCircleProps {
  number: number;
  size: string[];
  color: string;
  bgColor: string;
  onClick: () => void;
}

const NumberCircle: React.FC<NumberCircleProps> = ({
  number,
  size,
  color,
  bgColor,
  onClick,
}: NumberCircleProps) => {
  return (
    <Center
      w={size}
      h={size}
      color={color}
      bg={bgColor}
      rounded={"full"}
      fontSize={"lg"}
      onClick={onClick}
    >
      {number}
    </Center>
  );
};

export default NumberCircle;
