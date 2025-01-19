import { Button, Flex, Text } from "@chakra-ui/react";
import Timer from "../timer";
import { useForm } from "react-hook-form";

interface GuessingConsoleProps {
  maxGuess: number;
  guesses: number[];
  onGuess: (value: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: any;
}

const GuessingConsole = ({
  maxGuess,
  guesses,
  onGuess,
  translations,
}: GuessingConsoleProps) => {
  const { handleSubmit, setValue, watch } = useForm<{ value: number }>();
  const value = watch("value");

  const onSubmit = handleSubmit(async (data) => {
    onGuess(data.value);
  });

  const onTimerEnd = () => {};

  return (
    <form onSubmit={onSubmit}>
      <Timer
        duration={30}
        onEnd={onTimerEnd}
        color="green.base"
        endColor="red.base"
      />
      <Flex
        mt={["0.5rem"]}
        flexDir={"column"}
        gap={["1rem"]}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text textColor={"blue.base"} fontSize={["sm"]} fontWeight={["medium"]}>
          {translations("guess_instruction")}
        </Text>
        <Flex gap={["1rem"]} flexWrap={"wrap"} justifyContent={"center"}>
          {Array.from({ length: maxGuess + 1 }, (_, index) => (
            <Flex
              w={["2rem"]}
              h={["2rem"]}
              rounded="full"
              justifyContent={"center"}
              alignItems={"center"}
              opacity={guesses.includes(index) ? "0.2" : "100"}
              bgColor={value === index ? "blue.base" : "gray.1"}
              textColor={value === index ? "white" : "black"}
              cursor={guesses.includes(index) ? "default" : "pointer"}
              onClick={() => {
                if (!guesses.includes(index)) setValue("value", index);
              }}
              key={index}
            >
              {index}
            </Flex>
          ))}
        </Flex>
        <Button type="submit" size={["sm"]} variant={"game"}>
          {translations("confirm_button")}
        </Button>
      </Flex>
    </form>
  );
};

export default GuessingConsole;
