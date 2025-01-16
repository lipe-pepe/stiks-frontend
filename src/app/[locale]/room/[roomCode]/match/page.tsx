"use client";

import Console from "@/components/game/console";
import PlayerGameDisplay from "@/components/playerGameDisplay";
import { useMatchContext } from "@/context/matchContext";
import { PlayerGameData } from "@/types/match";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import { Flex, GridItem, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MatchPage() {
  const t = useTranslations("MatchPage");
  const { roomCode } = useParams();
  const { match, socket } = useMatchContext();
  const [players, setPlayers] = useState<PlayerGameData[]>(
    match.playersGameData
  );
  const [player, setPlayer] = useState<PlayerGameData>();

  // Atualiza os jogadores sempre que a sala muda
  useEffect(() => {
    setPlayers(match.playersGameData);
    setPlayer(match.playersGameData.find((p) => p.id === getSavedPlayerId()));
  }, [match]);

  useEffect(() => {
    // Reinsere o socket na sala ao recarregar a página
    if (socket) {
      socket.emit("loaded-game", {
        roomCode: roomCode,
      });
    }
  }, [roomCode, socket]);

  useEffect(() => {
    console.log("PLAYERS: ", players);
  }, [players]);

  return (
    <GridItem colSpan={[4]} colStart={[1]} textColor={"white"}>
      <Text textAlign={"center"} fontSize={"md"} fontWeight={700}>
        {t("round", { number: match.round })}
      </Text>
      {players.map((p, index) => (
        <PlayerGameDisplay
          key={index}
          playerGameData={p}
          currentPlayerId={String(player?.id)}
          translations={t}
          turn={match.turn}
          matchStatus={match.status}
        />
      ))}
      {player != null && socket != null && (
        <Flex position="fixed" bottom={0} left={0} right={0} mx={[4]} mb={[12]}>
          <Console
            socket={socket}
            roomCode={String(roomCode)}
            matchStatus={match.status}
            playersGameData={players}
            playerGameData={player}
            turnPlayer={match.turn}
          />
        </Flex>
      )}
    </GridItem>
  );
}
