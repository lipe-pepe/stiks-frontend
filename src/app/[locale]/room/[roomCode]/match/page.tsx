"use client";

import Console from "@/components/game/console";
import PlayerGameDisplay from "@/components/playerGameDisplay";
import { useMatchContext } from "@/context/matchContext";
import { gridGap, gridTemplateColumns } from "@/themes/gridConfig";
import { MatchStatus, PlayerGameData } from "@/types/match";
import getRoundWinner from "@/utils/game/getRoundWinner";
import getSticksRevealed from "@/utils/game/getSticksRevealed";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
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
  const [winnerId, setWinnerId] = useState<string>();
  const [totalRevealed, setTotalRevealed] = useState<number>();

  // Atualiza os jogadores sempre que a sala muda
  useEffect(() => {
    setPlayers(match.playersGameData);
    setPlayer(match.playersGameData.find((p) => p.id === getSavedPlayerId()));

    if (match.status === MatchStatus.results) {
      setWinnerId(getRoundWinner(match));
      setTotalRevealed(getSticksRevealed(match));
    }
  }, [match]);

  useEffect(() => {
    // Reinsere o socket na sala ao recarregar a página
    if (socket) {
      socket.emit("loaded-game", {
        roomCode: roomCode,
      });
    }
  }, [roomCode, socket]);

  return (
    <GridItem color={"white"} colSpan={[4, 6, 12]}>
      <GridItem textAlign={"center"} fontSize={"md"} fontWeight={700}>
        {t("round", { number: match.round })}
      </GridItem>
      <Grid
        bg={"lime"}
        templateColumns={gridTemplateColumns}
        gap={gridGap}
        templateRows="repeat(2, 1fr)"
      >
        <GridItem
          display={["none", "none", "flex"]}
          bg={"red"}
          colSpan={5}
          rowSpan={1}
          rowStart={1}
        >
          CONSOLE
        </GridItem>
        <GridItem
          display={["none", "none", "flex"]}
          bg={"skyblue"}
          colSpan={5}
          rowSpan={1}
          rowStart={2}
        >
          CHAT
        </GridItem>
        <GridItem bg={"fuchsia"} rowSpan={2} colSpan={[4, 6, 7]}>
          PLAYERSSS
        </GridItem>
      </Grid>
    </GridItem>
    // <GridItem colSpan={[4]} colStart={[1]} textColor={"white"}>
    //   <Text textAlign={"center"} fontSize={"md"} fontWeight={700}>
    //     {t("round", { number: match.round })}
    //   </Text>
    //   {players.map((p, index) => (
    //     <PlayerGameDisplay
    //       key={index}
    //       playerGameData={p}
    //       currentPlayerId={String(player?.id)}
    //       translations={t}
    //       turn={match.turn}
    //       matchStatus={match.status}
    //     />
    //   ))}
    //   {player != null && socket != null && (
    //     <Flex position="fixed" bottom={0} left={0} right={0} mx={[4]} mb={[12]}>
    //       <Console
    //         socket={socket}
    //         roomCode={String(roomCode)}
    //         matchStatus={match.status}
    //         players={players}
    //         playerGameData={player}
    //         turnPlayer={match.turn}
    //         winner={winnerId}
    //         total={totalRevealed}
    //       />
    //     </Flex>
    //   )}
    // </GridItem>
  );
}
