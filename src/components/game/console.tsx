"use client";

import { GameStatus } from "@/types/room";
import { Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Player } from "@/types/player";
import { useTranslations } from "next-intl";
import { Socket } from "socket.io-client";
import getGameTotalSticks from "@/utils/game/getGameTotalSticks";
import getGameGuesses from "@/utils/game/getGameGuesses";
import ChoosingConsole from "./choosingConsole";
import GuessingConsole from "./guessingConsole";
import Timer from "../timer";

interface ConsoleProps {
  socket: Socket;
  roomCode: string;
  gameStatus: GameStatus; // O status do jogo - choosing, guessing, revealing ou results
  players: Player[]; // Todos os jogadores da sala
  player: Player; // O jogador que está renderizando a tela
  turnPlayer: string | undefined; // O id do jogador da rodada atual
}

const Console: React.FC<ConsoleProps> = ({
  socket,
  roomCode,
  gameStatus,
  players,
  player,
  turnPlayer,
}: ConsoleProps) => {
  const t = useTranslations("Console");

  const handlePlayerChose = (value: number) => {
    if (socket) {
      socket.emit("player-chose", {
        roomCode: roomCode,
        playerId: player?._id,
        value: value,
      });
    }
  };

  const handlePlayerGuess = (value: number) => {
    if (socket) {
      socket.emit("player-guessed", {
        roomCode: roomCode,
        playerId: player?._id,
        value: value,
      });
    }
  };

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"white"}
      borderRadius={[12]}
      p={[4]}
      position={"fixed"}
      bottom={10}
    >
      {gameStatus === GameStatus.choosing && (
        <ChoosingConsole
          total={player?.gameData.total || 0}
          onChoose={handlePlayerChose}
          translations={t}
        />
      )}
      {gameStatus === GameStatus.guessing && turnPlayer === player._id && (
        <GuessingConsole
          maxGuess={getGameTotalSticks(players)}
          guesses={getGameGuesses(players)}
          onGuess={handlePlayerGuess}
          translations={t}
        />
      )}
      {gameStatus === GameStatus.guessing && turnPlayer !== player._id && (
        <VStack>
          <Timer
            duration={30}
            onEnd={() => {}}
            color="blue.base"
            endColor="blue.base"
          />
          <Text fontSize={["sm"]} textColor="black">
            {t("player_guessing", {
              name: players.find((p) => p._id === turnPlayer)?.name,
            })}
          </Text>
        </VStack>
      )}
    </Flex>
  );
};

export default Console;
