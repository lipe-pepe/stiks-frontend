import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAlarm } from "react-icons/md";

interface TimerProps {
  duration: number; // tempo em segundos
  onEnd: () => void; // Callback quando chegar a 0
  color: string;
  endColor: string;
}

const Timer: React.FC<TimerProps> = ({
  duration,
  onEnd,
  color,
  endColor,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const startTime = useRef(Date.now());
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const elapsed = (Date.now() - startTime.current) / 1000; // Tempo decorrido em segundos
      const remaining = Math.max(duration - elapsed, 0); // Evita valores negativos
      setTimeLeft(remaining);

      if (remaining === 0) {
        cancelAnimationFrame(timerId.current!);
        onEnd();
      } else {
        timerId.current = requestAnimationFrame(updateTimer); // Continua atualizando
      }
    };

    timerId.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(timerId.current!); // Limpa o timer ao desmontar o componente
  }, [duration, onEnd]);

  return (
    <Flex width={"100%"} alignItems={"center"} gap={["0.5rem"]}>
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
          bgColor={timeLeft / duration > 0.2 ? color : endColor}
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
