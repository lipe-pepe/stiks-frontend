"use client";

import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "next-intl";
import { Socket } from "socket.io-client";
import getGameTotalSticks from "@/utils/game/getGameTotalSticks";
import getGameGuesses from "@/utils/game/getGameGuesses";
import ChoosingConsole from "./choosingConsole";
import GuessingConsole from "./guessingConsole";
import Timer from "../timer";
import { MatchStatus, PlayerGameData } from "@/types/match";
import getPlayerName from "@/utils/game/getPlayerName";
import { PlayerRole } from "@/types/player";

interface TotalDisplayProps {
  totalText: string;
  total: number;
}

const TotalDisplay: React.FC<TotalDisplayProps> = ({
  totalText,
  total,
}: TotalDisplayProps) => {
  return (
    <Flex flexDir={"column"} alignItems={"center"} gap={[2]}>
      <Text fontSize={"xs"} textTransform={"uppercase"}>
        {totalText}
      </Text>
      <Flex
        w={["2rem"]}
        h={["2rem"]}
        bg={"gray.1"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"xl"}
        rounded={"full"}
        fontWeight={"bold"}
      >
        {total}
      </Flex>
    </Flex>
  );
};

interface ConsoleProps {
  socket: Socket;
  roomCode: string;
  matchStatus: MatchStatus; // O status do jogo - choosing, guessing, revealing ou results
  playersGameData: PlayerGameData[];
  playerGameData: PlayerGameData; // O jogador que está renderizando a tela
  turnPlayer: string | undefined; // O id do jogador da rodada atual
  winner: string | undefined; // O id do jogador vencedor da rodada
  total: number | undefined; // O total de palitinhos já revelados do jogo
}

const Console: React.FC<ConsoleProps> = ({
  socket,
  roomCode,
  matchStatus,
  playersGameData,
  playerGameData,
  turnPlayer,
  winner,
  total,
}: ConsoleProps) => {
  const t = useTranslations("Console");

  const handlePlayerChose = (value: number) => {
    if (socket) {
      socket.emit("player-chose", {
        roomCode: roomCode,
        playerId: playerGameData?.id,
        value: value,
      });
    }
  };

  const handlePlayerGuess = (value: number) => {
    if (socket) {
      socket.emit("player-guessed", {
        roomCode: roomCode,
        playerId: playerGameData?.id,
        value: value,
      });
    }
  };

  const handlePlayerReveal = () => {
    if (socket && playerGameData.id === turnPlayer) {
      socket.emit("player-revealed", {
        roomCode: roomCode,
        playerId: playerGameData.id,
      });
    }
  };

  return (
    <Flex
      width={"100%"}
      flexDir={"column"}
      textAlign={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={[12]}
      p={[4]}
    >
      {matchStatus === MatchStatus.choosing &&
        playerGameData.chosen == null && (
          <ChoosingConsole
            total={playerGameData.total}
            onChoose={handlePlayerChose}
            translations={t}
          />
        )}
      {matchStatus === MatchStatus.choosing &&
        playerGameData.chosen != null && (
          <>
            <Text fontSize={["sm"]} textColor="black">
              {t("wait_instruction")}
            </Text>
          </>
        )}
      {matchStatus === MatchStatus.guessing &&
        turnPlayer === playerGameData.id && (
          <GuessingConsole
            maxGuess={getGameTotalSticks(playersGameData)}
            guesses={getGameGuesses(playersGameData)}
            onGuess={handlePlayerGuess}
            translations={t}
          />
        )}
      <Flex flexDir={"column"} width={"100%"} gap={[4]} p={[2]}>
        {matchStatus === MatchStatus.guessing &&
          turnPlayer !== playerGameData.id && (
            <>
              <Timer
                duration={30}
                onEnd={() => {}}
                color="blue.base"
                endColor="blue.base"
              />
              <Text fontSize={["sm"]} textColor="black">
                {t("player_guessing", {
                  name: playersGameData.find((p) => p.id === turnPlayer)?.name,
                })}
              </Text>
            </>
          )}
        {matchStatus === MatchStatus.revealing && (
          <>
            <Timer
              duration={5}
              onEnd={handlePlayerReveal}
              color="blue.base"
              endColor="blue.base"
            />
            <Flex
              color="black"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text>
                {t("player_revealing", {
                  name: playersGameData.find((p) => p.id === turnPlayer)?.name,
                })}
              </Text>
              <TotalDisplay totalText={t("total")} total={Number(total)} />
            </Flex>
          </>
        )}
        {matchStatus === MatchStatus.results && (
          <Flex flexDir={"column"} alignItems={"center"} gap={["1rem"]}>
            <Flex
              color="black"
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={["1rem"]}
            >
              <VStack textAlign={"center"}>
                <Flex fontSize={["lg"]} gap={2} fontWeight={"bold"}>
                  <Text color={winner != null ? "blue.base" : "red.base"}>
                    {getPlayerName(playersGameData, String(winner)) ||
                      t("no_one")}
                  </Text>
                  <Text>{t("player_won")}</Text>
                </Flex>
                {winner != null && (
                  <Text fontSize={["sm"]}>{t("lose_stick")}</Text>
                )}
              </VStack>
              <TotalDisplay totalText={t("total")} total={Number(total)} />
            </Flex>
            {playerGameData.role === PlayerRole.host && (
              <Button variant={"primary"}>{t("next_round")}</Button>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Console;
