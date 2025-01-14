"use client";

import ChoosingForm from "@/components/game/choosingForm";
import PlayerGameDisplay from "@/components/playerGameDisplay";
import { useRoomContext } from "@/context/roomContext";
import { Player } from "@/types/player";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import { Flex, GridItem, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function GamePage() {
  const t = useTranslations("GamePage");
  const { room, socket } = useRoomContext();
  const [players, setPlayers] = useState<Player[]>(room?.players || []);
  const [player, setPlayer] = useState<Player>();

  // Atualiza os jogadores sempre que a sala muda
  useEffect(() => {
    setPlayers(room?.players || []);
    setPlayer(room?.players.find((p) => p._id === getSavedPlayerId()));
  }, [room]);

  const handlePlayerChose = (value: number) => {
    console.log("Escolhido: ", value);
    if (socket) {
      socket.emit("player-chose", {
        roomCode: room?.code,
        playerId: player?._id,
        value: value,
      });
    }
  };

  return (
    <GridItem colSpan={[4]} colStart={[null]} textColor={"white"}>
      <Text textAlign={"center"} fontSize={"md"} fontWeight={700}>
        {t("round", { number: room?.match.round })}
      </Text>
      {players.map((p, index) => (
        <PlayerGameDisplay key={index} player={p} translations={t} />
      ))}
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
        <ChoosingForm
          total={player?.gameData.total || 0}
          onChoose={handlePlayerChose}
          translations={t}
        />
      </Flex>
    </GridItem>
  );
}
