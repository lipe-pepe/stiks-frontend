import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Timer from "../timer";

interface ChoosingConsoleProps {
  total: number;
  onChoose: (value: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations: any;
}

const ChoosingConsole = ({
  total,
  onChoose,
  translations,
}: ChoosingConsoleProps) => {
  const { handleSubmit, setValue, watch } = useForm<{ value: number }>();
  const value = watch("value");

  const onSubmit = handleSubmit(async (data) => {
    onChoose(data.value);
  });

  const onTimerEnd = () => {
    // Quando o tempo acaba, o jogo escolhe o valor selecionado ou um valor aleatório
    // if (value != null) {
    //   onChoose(value);
    // } else {
    //   const random = Math.floor(Math.random() * (total + 1));
    //   onChoose(random);
    // }
  };

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
        <Text
          fontSize={["sm", "sm", "lg"]}
          fontWeight={"medium"}
          textColor={"blue.base"}
        >
          {translations("choose_instruction")}
        </Text>
        <HStack>
          {Array.from({ length: total + 1 }, (_, index) => (
            <Flex
              w={["2rem"]}
              h={["2rem"]}
              rounded="full"
              justifyContent={"center"}
              alignItems={"center"}
              bgColor={value === index ? "blue.base" : "gray.1"}
              textColor={value === index ? "white" : "black"}
              cursor={"pointer"}
              onClick={() => setValue("value", index)}
              key={index}
            >
              {index}
            </Flex>
          ))}
        </HStack>
        <Button type="submit" size={["sm"]} variant={"game"}>
          {translations("confirm_button")}
        </Button>
      </Flex>
    </form>
  );
};

export default ChoosingConsole;
