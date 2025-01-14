import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAlarm } from "react-icons/md";

interface TimerProps {
  duration: number; // tempo em segundos
  onEnd: () => void; // Callback quando chegar a 0
}

const Timer: React.FC<TimerProps> = ({ duration, onEnd }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // Define o intervalo que diminui o tempo a cada segundo
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Para o timer ao chegar a zero
          onEnd();
          return 0;
        }
        return prev - 1; // Decrementa o tempo
      });
    }, 1000); // Cleanup: limpa o intervalo ao desmontar o componente

    return () => clearInterval(timer);
  }, [onEnd]);

  return (
    <Flex alignItems={"center"} gap={["0.5rem"]}>
      <MdAlarm size={"1.2rem"} color="black" />
      <Box
        position={"relative"}
        rounded={"full"}
        bgColor={"gray.1"}
        w={"full"}
        h={["0.5rem"]}
      >
        <Box
          top={0}
          left={0}
          rounded={"full"}
          bgColor={timeLeft / duration > 0.2 ? "green.base" : "red.base"}
          height={"100%"}
          w={`${(timeLeft / duration) * 100}%`}
          zIndex={99}
          position={"absolute"}
        ></Box>
      </Box>
    </Flex>
  );
};

export default Timer;
