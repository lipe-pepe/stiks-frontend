import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Timer from "../timer";

interface ChoosingFormProps {
  total: number;
  onChoose: (value: number) => void;
  translations: any;
}

const ChoosingForm = ({ total, onChoose, translations }: ChoosingFormProps) => {
  const { handleSubmit, setValue, watch } = useForm<{ value: number }>();
  const value = watch("value");

  const onSubmit = handleSubmit(async (data) => {
    onChoose(data.value);
  });

  const onTimerEnd = () => {};

  return (
    <form onSubmit={onSubmit}>
      <Timer duration={30} onEnd={onTimerEnd} />
      <Flex
        mt={["0.5rem"]}
        flexDir={"column"}
        gap={["1rem"]}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text textColor={"blue.base"} fontSize={["sm"]} fontWeight={["medium"]}>
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

export default ChoosingForm;
