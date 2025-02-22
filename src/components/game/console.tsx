"use client";

import { Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "next-intl";
import Timer from "../timer";
import { useForm } from "react-hook-form";
import NumberCircle from "../numberCircle";
import SpecialButton from "../specialButton";
import useSound from "use-sound";
import ErrorMessage from "../errorMessage";

interface ConsoleProps {
  text: string;
  subtext?: string;
  timerSeconds?: number;
  timerHasSound?: boolean;
  onTimerEnd?: () => void;
  hasForm?: boolean;
  onFormSubmit?: (data: number) => void;
  formOptions?: number[];
  formLoading?: boolean;
  isHost: boolean;
  hostButtonText?: string;
  onHostButtonClick?: () => void;
}

const Console: React.FC<ConsoleProps> = ({
  text,
  subtext,
  timerSeconds,
  timerHasSound = false,
  onTimerEnd,
  hasForm,
  onFormSubmit,
  formOptions,
  formLoading = false,
  isHost,
  hostButtonText,
  onHostButtonClick,
}: ConsoleProps) => {
  const t = useTranslations("Console");

  const [playClick1] = useSound("/sounds/click_1.mp3");

  const {
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<{
    value: number;
  }>();
  const value = watch("value");

  const onSubmit = handleSubmit(async (data) => {
    // Seta um erro se não tiver valor selecionado
    if (data.value == null) {
      setError("value", {
        type: "custom",
        message: t("undefined_value_error"),
      });
    } else {
      // Envia o valor
      if (onFormSubmit != null) {
        resetField("value");
        onFormSubmit(data.value);
      }
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
          endDuration={timerSeconds / 5}
          onEnd={onTimerEnd}
          color={hasForm ? "green.base" : "blue.base"}
          endColor={hasForm ? "red.base" : "blue.base"}
          hasSound={timerHasSound}
        />
      )}
      <VStack
        justifyContent={"center"}
        flex={"1"}
        gap={["1rem", "1rem", "2rem"]}
      >
        <Text
          fontWeight={"bold"}
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
                    hoverBgColor={value === opt ? "blue.dark" : "gray.2"}
                    bgColor={value === opt ? "blue.base" : "gray.1"}
                    onClick={() => {
                      setValue("value", opt);
                      clearErrors("value"); // Limpa os erros antes de enviar
                      playClick1();
                    }}
                    cursor="pointer"
                  />
                ))}
              </Flex>
              {errors.value && (
                <ErrorMessage
                  message={String(errors.value.message)}
                  color="red.base"
                />
              )}
              <SpecialButton
                isLoading={formLoading}
                text={t("confirm_button")}
                type="submit"
                size={"md"}
                variant={"game"}
                onClick={() => {}}
              />
            </VStack>
          </form>
        )}

        <Text
          color={"black"}
          fontFamily={"inter"}
          fontSize={["sm", null, "md"]}
        >
          {subtext}
        </Text>
        {isHost && hostButtonText != null && onHostButtonClick != null && (
          <SpecialButton onClick={onHostButtonClick} text={hostButtonText} />
        )}
      </VStack>
    </VStack>
  );
};

export type { ConsoleProps };
export default Console;
