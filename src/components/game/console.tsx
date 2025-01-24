"use client";

import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "next-intl";
import Timer from "../timer";
import { useForm } from "react-hook-form";
import NumberCircle from "../numberCircle";

interface ConsoleProps {
  text: string;
  subtext?: string;
  timerSeconds?: number;
  onTimerEnd?: () => void;
  hasForm?: boolean;
  onFormSubmit?: (data: number) => void;
  formOptions?: number[];
  isHost: boolean;
  hasHostButton?: boolean;
  hostButtonText?: string;
  onHostButtonClick?: () => void;
}

const Console: React.FC<ConsoleProps> = ({
  text,
  subtext,
  timerSeconds,
  onTimerEnd,
  hasForm,
  onFormSubmit,
  formOptions,
  isHost,
  hasHostButton = false,
  hostButtonText,
  onHostButtonClick,
}: ConsoleProps) => {
  const t = useTranslations("Console");

  const { handleSubmit, setValue, watch, resetField } = useForm<{
    value: number;
  }>();
  const value = watch("value");

  const onSubmit = handleSubmit(async (data) => {
    if (onFormSubmit != null) {
      resetField("value");
      onFormSubmit(data.value);
    }
  });

  return (
    <VStack
      h={"100%"}
      w={"100%"}
      bgColor={"white"}
      gap={["1rem", "1rem", "2rem"]}
      borderRadius={[12]}
      p={[6]}
      fontSize={["sm"]}
      color={"black"}
      justifyContent="space-between"
      textAlign={"center"}
    >
      {timerSeconds != null && onTimerEnd != null && (
        <Timer
          key={`Timer for ${text}`}
          duration={timerSeconds}
          // onEnd={onTimerEnd}
          onEnd={() => {}}
          color={hasForm ? "green.base" : "blue.base"}
          endColor={hasForm ? "red.base" : "blue.base"}
        />
      )}
      <VStack
        justifyContent={"center"}
        flex={"1"}
        gap={["1rem", "1rem", "2rem"]}
      >
        <Text
          fontWeight={["normal", null, "semibold"]}
          fontSize={["sm", "sm", "lg"]}
          color={hasForm ? "blue.base" : "black"}
        >
          {text}
        </Text>
        {hasForm && (
          <form onSubmit={onSubmit}>
            <VStack gap={["1rem", "1rem", "2rem"]}>
              <Flex gap={["1rem"]} flexWrap={"wrap"} justifyContent={"center"}>
                {formOptions?.map((opt, index) => (
                  <NumberCircle
                    key={index}
                    size={["2rem", "2rem", "2.5rem"]}
                    number={opt}
                    color={value === opt ? "white" : "black"}
                    bgColor={value === opt ? "blue.base" : "gray.1"}
                    onClick={() => setValue("value", opt)}
                    cursor="pointer"
                  />
                ))}
              </Flex>
              <Button type="submit" size={["sm", "sm", "md"]} variant={"game"}>
                {t("confirm_button")}
              </Button>
            </VStack>
          </form>
        )}
        {isHost && hasHostButton && (
          <Button onClick={onHostButtonClick}>{hostButtonText}</Button>
        )}
        <Text color={"black"} fontSize={["sm", null, "md"]}>
          {subtext}
        </Text>
      </VStack>
    </VStack>
  );
};

export type { ConsoleProps };
export default Console;
