"use client";

import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "next-intl";
import Timer from "../timer";
import { useForm } from "react-hook-form";
import NumberCircle from "../numberCircle";

// interface TotalDisplayProps {
//   totalText: string;
//   total: number;
// }

// const TotalDisplay: React.FC<TotalDisplayProps> = ({
//   totalText,
//   total,
// }: TotalDisplayProps) => {
//   return (
//     <Flex flexDir={"column"} alignItems={"center"} gap={[2]}>
//       <Text fontSize={"xs"} textTransform={"uppercase"}>
//         {totalText}
//       </Text>
//       <Flex
//         w={["2rem"]}
//         h={["2rem"]}
//         bg={"gray.1"}
//         justifyContent={"center"}
//         alignItems={"center"}
//         fontSize={"xl"}
//         rounded={"full"}
//         fontWeight={"bold"}
//       >
//         {total}
//       </Flex>
//     </Flex>
//   );
// };

interface ConsoleProps {
  text: string;
  timerSeconds?: number;
  onTimerEnd?: () => void;
  hasForm?: boolean;
  onFormSubmit?: (data: number) => void;
  formOptions?: number[];
}

const Console: React.FC<ConsoleProps> = ({
  text,
  timerSeconds,
  onTimerEnd,
  hasForm,
  onFormSubmit,
  formOptions,
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
          duration={timerSeconds}
          onEnd={() => {}}
          // onEnd={onTimerEnd}
          color="green.base"
          endColor="red.base"
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
                  />
                ))}
              </Flex>
              <Button type="submit" size={["sm", "sm", "md"]} variant={"game"}>
                {t("confirm_button")}
              </Button>
            </VStack>
          </form>
        )}
      </VStack>
    </VStack>
    // <Flex
    //   width={"100%"}
    //   flexDir={"column"}
    //   textAlign={"center"}
    //   justifyContent={"center"}
    //   alignItems={"center"}
    //   bgColor={"white"}
    //   borderRadius={[12]}
    //   p={[4]}
    // >
    //   {matchStatus === MatchStatus.choosing &&
    //     playerGameData.chosen == null && (
    //       <ChoosingConsole
    //         total={playerGameData.total}
    //         onChoose={handlePlayerChose}
    //         translations={t}
    //       />
    //     )}
    //   {matchStatus === MatchStatus.choosing &&
    //     playerGameData.chosen != null && (
    //       <>
    //         <Text fontSize={["sm"]} textColor="black">
    //           {t("wait_instruction")}
    //         </Text>
    //       </>
    //     )}
    //   {matchStatus === MatchStatus.guessing &&
    //     turnPlayer === playerGameData.id && (
    //       <GuessingConsole
    //         maxGuess={getGameTotalSticks(players)}
    //         guesses={getGameGuesses(players)}
    //         onGuess={handlePlayerGuess}
    //         translations={t}
    //       />
    //     )}
    //   <Flex flexDir={"column"} width={"100%"} gap={[4]} p={[2]}>
    //     {matchStatus === MatchStatus.guessing &&
    //       turnPlayer !== playerGameData.id && (
    //         <>
    //           <Timer
    //             duration={30}
    //             onEnd={() => {}}
    //             color="blue.base"
    //             endColor="blue.base"
    //           />
    //           <Text fontSize={["sm"]} textColor="black">
    //             {t("player_guessing", {
    //               name: players.find((p) => p.id === turnPlayer)?.name,
    //             })}
    //           </Text>
    //         </>
    //       )}
    //     {matchStatus === MatchStatus.revealing && (
    //       <>
    //         <Timer
    //           duration={5}
    //           onEnd={handlePlayerReveal}
    //           color="blue.base"
    //           endColor="blue.base"
    //         />
    //         <Flex
    //           color="black"
    //           justifyContent={"space-between"}
    //           alignItems={"center"}
    //         >
    //           <Text>
    //             {t("player_revealing", {
    //               name: players.find((p) => p.id === turnPlayer)?.name,
    //             })}
    //           </Text>
    //           <TotalDisplay totalText={t("total")} total={total || 0} />
    //         </Flex>
    //       </>
    //     )}
    //     {matchStatus === MatchStatus.results && (
    //       <Flex flexDir={"column"} alignItems={"center"} gap={["1rem"]}>
    //         <Flex
    //           color="black"
    //           justifyContent={"space-between"}
    //           alignItems={"center"}
    //           gap={["1rem"]}
    //         >
    //           <VStack textAlign={"center"}>
    //             <Flex fontSize={["lg"]} gap={2} fontWeight={"bold"}>
    //               <Text color={winner != null ? "blue.base" : "red.base"}>
    //                 {getPlayerName(players, String(winner)) == null
    //                   ? t("no_one")
    //                   : getPlayerName(players, String(winner)) ==
    //                     playerGameData.name
    //                   ? t("you")
    //                   : getPlayerName(players, String(winner))}
    //               </Text>
    //               <Text>{t("player_won")}</Text>
    //             </Flex>
    //             {winner != null && (
    //               <Text fontSize={["sm"]}>{t("lose_stick")}</Text>
    //             )}
    //           </VStack>
    //           <TotalDisplay totalText={t("total")} total={total || 0} />
    //         </Flex>
    //         {playerGameData.role === PlayerRole.host && (
    //           <Button
    //             size={"sm"}
    //             variant={"primary"}
    //             onClick={() => {
    //               handleNextRound();
    //             }}
    //           >
    //             {t("next_round")}
    //           </Button>
    //         )}
    //       </Flex>
    //     )}
    //   </Flex>
    // </Flex>
  );
};

export type { ConsoleProps };
export default Console;
