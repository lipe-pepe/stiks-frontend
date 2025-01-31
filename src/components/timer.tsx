import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAlarm } from "react-icons/md";
import useSound from "use-sound";

interface TimerProps {
  duration: number; // Tempo total em segundos
  endDuration: number; // Tempo no qual um som diferente deve tocar
  hasSound: boolean;
  onEnd: () => void; // Callback quando chegar a 0
  color: string;
  endColor: string;
}

const Timer: React.FC<TimerProps> = ({
  duration,
  endDuration,
  hasSound,
  onEnd,
  color,
  endColor,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [hasPlayedEndSound, setHasPlayedEndSound] = useState(false); // Controle para não tocar várias vezes
  const startTime = useRef(Date.now());
  const timerId = useRef<number | null>(null);

  const [playClock, { stop: stopClock }] = useSound("/sounds/clock.mp3", {
    volume: 0.5,
  });
  const [playEndClock, { stop: stopEndClock }] = useSound(
    "/sounds/clock_fast.mp3",
    { volume: 1.0 }
  );

  // Toca o som do timer ao montar o componente
  useEffect(() => {
    if (hasSound) {
      playClock();
    }

    return () => {
      // Para o som quando o componente for desmontado
      stopClock();
      stopEndClock();
    };
  }, [playClock, hasSound, stopClock, stopEndClock]);

  useEffect(() => {
    const updateTimer = () => {
      const elapsed = (Date.now() - startTime.current) / 1000; // Tempo decorrido em segundos
      const remaining = Math.max(duration - elapsed, 0); // Evita valores negativos
      setTimeLeft(remaining);

      // Se o tempo restante for menor ou igual ao endDuration e ainda não tocou o som final
      if (remaining <= endDuration && !hasPlayedEndSound && hasSound) {
        stopClock();
        playEndClock();
        setHasPlayedEndSound(true); // Garante que o som toque apenas uma vez
      }

      if (remaining === 0) {
        cancelAnimationFrame(timerId.current!);
        onEnd();
      } else {
        timerId.current = requestAnimationFrame(updateTimer); // Continua atualizando
      }
    };

    timerId.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(timerId.current!); // Limpa o timer ao desmontar o componente
  }, [duration, endDuration, onEnd, hasPlayedEndSound, playEndClock]);

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
