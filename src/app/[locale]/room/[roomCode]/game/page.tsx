"use client";

import Console from "@/components/game/console";
import PlayerGameDisplay from "@/components/playerGameDisplay";
import { useRoomContext } from "@/context/roomContext";
import { Player } from "@/types/player";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import { GridItem, Text } from "@chakra-ui/react";
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

  useEffect(() => {
    // Reinsere o socket na sala ao recarregar a página
    if (socket) {
      socket.emit("loaded-game", {
        roomCode: room?.code,
      });
    }
  }, []);

  return (
    <GridItem colSpan={[4]} colStart={[1]} textColor={"white"}>
      <Text textAlign={"center"} fontSize={"md"} fontWeight={700}>
        {t("round", { number: room?.round })}
      </Text>
      {players.map((p, index) => (
        <PlayerGameDisplay
          key={index}
          player={p}
          translations={t}
          turn={String(room?.turn)}
          gameStatus={room?.status}
        />
      ))}
      {room != null && player != null && socket != null && (
        <Console
          socket={socket}
          roomCode={room.code}
          gameStatus={room?.status}
          players={players}
          player={player}
          turnPlayer={room.turn}
        />
      )}
    </GridItem>
  );
}
