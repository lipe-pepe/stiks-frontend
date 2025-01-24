"use client";

import ChatInput from "@/components/chatInput";
import ChatMessages from "@/components/chatMessages";
import FlexContainer from "@/components/flexContainer";
import Console, { ConsoleProps } from "@/components/game/console";
import PlayerGrid from "@/components/game/playerGrid";
import { useMatchContext } from "@/context/matchContext";
import { gridGap, gridTemplateColumns } from "@/themes/gridConfig";
import { Match, MatchStatus, PlayerGameData } from "@/types/match";
import { PlayerRole } from "@/types/player";
import getAvailableGuesses from "@/utils/game/getAvailableGuesses";
import getPlayerName from "@/utils/game/getPlayerName";
import getRoundWinner from "@/utils/game/getRoundWinner";
import getSticksRevealed from "@/utils/game/getSticksRevealed";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  Box,
  Grid,
  GridItem,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdChatBubbleOutline } from "react-icons/md";

export default function MatchPage() {
  const t = useTranslations("MatchPage");
  const { roomCode } = useParams();
  const { match, socket, chat } = useMatchContext();
  const [players, setPlayers] = useState<PlayerGameData[]>(
    match.playersGameData
  );
  const [player, setPlayer] = useState<PlayerGameData>();
  const [winnerId, setWinnerId] = useState<string>();
  const [totalRevealed, setTotalRevealed] = useState<number>();

  const savedId = getSavedPlayerId();

  const chatModal = useDisclosure();

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

  // Atualiza o console
  useEffect(() => {
    if (match != null && player != null) {
      setConsole(getConsoleProps(match, player));
    }
  }, [match, player]);

  const handlePlayerChose = (value: number) => {
    if (socket) {
      socket.emit("player-chose", {
        roomCode: roomCode,
        playerId: savedId,
        value: value,
      });
    }
  };

  const handlePlayerGuess = (value: number) => {
    if (socket) {
      socket.emit("player-guessed", {
        roomCode: roomCode,
        playerId: savedId,
        value: value,
      });
    }
  };

  const handlePlayerReveal = () => {
    if (socket && player?.id === match.turn) {
      socket.emit("player-revealed", {
        roomCode: roomCode,
        playerId: savedId,
      });
    }
  };

  const handleNextRound = () => {
    if (socket) {
      socket.emit("next-round", {
        roomCode: roomCode,
        winnerId: winnerId,
      });
    }
  };

  const getConsoleProps = (m: Match, p: PlayerGameData) => {
    const props: ConsoleProps = {
      text: "",
      isHost: p?.role === PlayerRole.host,
    };

    if (m.status === MatchStatus.choosing && p?.chosen == null) {
      props.text = t("choose_instruction");
      props.formOptions = [0, 1, 2, 3];
      props.hasForm = true;
      props.onFormSubmit = handlePlayerChose;
      props.timerSeconds = 30;
      props.onTimerEnd = () =>
        handlePlayerChose(Math.floor(Math.random() * (Number(p?.total) + 1))); // Pega um valor aleatório
    }

    if (m.status === MatchStatus.choosing && p?.chosen != null) {
      props.text = t("wait_instruction");
      props.hasForm = false;
    }

    if (m.status === MatchStatus.guessing && m.turn === p?.id) {
      props.text = t("guess_instruction");
      props.formOptions = getAvailableGuesses(m.playersGameData);
      props.hasForm = true;
      props.onFormSubmit = handlePlayerGuess;
    }

    if (m.status === MatchStatus.guessing && m.turn != p?.id) {
      props.text = t("player_guessing", {
        name: getPlayerName(m.playersGameData, m.turn),
      });
      props.hasForm = false;
    }

    if (m.status === MatchStatus.revealing) {
      props.text = t("player_revealing", {
        name:
          m.turn === p?.id
            ? t("you")
            : getPlayerName(m.playersGameData, m.turn),
      });
      props.hasForm = false;
      props.timerSeconds = 5;
      props.onTimerEnd = handlePlayerReveal;
    }

    if (m.status === MatchStatus.results) {
      props.text = t("player_won", {
        name:
          winnerId == null
            ? t("no_one")
            : winnerId === savedId
            ? t("you")
            : getPlayerName(m.playersGameData, winnerId),
      });
      props.hasForm = false;
      props.hostButtonText = t("next_round");
      props.hasHostButton = true;
      props.onHostButtonClick = handleNextRound;
      props.subtext =
        p?.role === PlayerRole.host ? undefined : t("waiting_host");
    }

    return props;
  };

  const [console, setConsole] = useState<ConsoleProps>();

  return (
    <>
      <GridItem color={"white"} colSpan={[4, 6, 12]}>
        <GridItem
          textAlign={"center"}
          fontSize={["md", "md", "xl"]}
          fontWeight={700}
          position={"relative"}
        >
          {t("round", { number: match.round })}
          <VStack
            display={["flex", "flex", "none"]}
            color={"rgba(255,255,255,0.5)"}
            position={"absolute"}
            right={0}
            bottom={0}
            onClick={() => chatModal.onToggle()}
          >
            <MdChatBubbleOutline />
            <Text
              fontSize={"xs"}
              textTransform={"lowercase"}
              fontWeight={"normal"}
            >
              {t("show_chat")}
            </Text>
          </VStack>
        </GridItem>
        <Grid
          templateColumns={gridTemplateColumns}
          gap={gridGap}
          templateRows="repeat(2, 1fr)"
        >
          {/* CONSOLE */}
          <GridItem
            position={["fixed", "fixed", "initial"]}
            zIndex={[99, 99, "auto"]}
            bottom={0}
            left={0}
            right={0}
            mx={[4, 20, 0]}
            mb={[16, 16, 0]}
            colSpan={5}
            rowSpan={1}
            rowStart={1}
          >
            {console != null && (
              <Console
                timerSeconds={console.timerSeconds}
                onTimerEnd={console.onTimerEnd}
                text={console.text}
                subtext={console.subtext}
                hasForm={console.hasForm}
                onFormSubmit={console.onFormSubmit}
                formOptions={console.formOptions}
                isHost={console.isHost}
                onHostButtonClick={console.onHostButtonClick}
                hostButtonText={console.hostButtonText}
                hasHostButton={console.hasHostButton}
              />
            )}
          </GridItem>
          {/* CHAT */}
          <GridItem
            display={["none", "none", "flex"]}
            colSpan={5}
            rowSpan={1}
            rowStart={2}
          >
            <Box
              p={"1rem"}
              height={"100%"}
              width={"100%"}
              borderRadius={12}
              bgColor={"base.transparent"}
            >
              <FlexContainer
                fixedStart={
                  <Text
                    textAlign="center"
                    fontSize={"sm"}
                    textTransform={"uppercase"}
                    fontWeight={"semibold"}
                    color="white"
                  >
                    {t("chat")}
                  </Text>
                }
                scrollableContent={<ChatMessages messages={chat} />}
                fixedEnd={
                  socket !== null && (
                    <ChatInput
                      playerName={String(player?.name)}
                      roomCode={String(roomCode)}
                      socket={socket}
                    />
                  )
                }
              />
            </Box>
          </GridItem>
          {/* PLAYERS */}
          <GridItem rowSpan={2} colSpan={[4, 6, 7]}>
            <PlayerGrid players={players} />
          </GridItem>
        </Grid>
      </GridItem>
      <Modal isCentered onClose={chatModal.onClose} isOpen={chatModal.isOpen}>
        <ModalOverlay />
        <ModalContent bg={"none"} mx={"2rem"}>
          <ModalCloseButton color={"white"} />
          <Box
            p={"1rem"}
            height={"100%"}
            borderRadius={12}
            bgColor={"base.base"}
          >
            <FlexContainer
              fixedStart={
                <Text
                  textAlign="center"
                  fontSize={"sm"}
                  textTransform={"uppercase"}
                  fontWeight={"semibold"}
                  color="white"
                >
                  {t("chat")}
                </Text>
              }
              scrollableContent={<ChatMessages messages={chat} />}
              fixedEnd={
                socket !== null && (
                  <ChatInput
                    playerName={String(player?.name)}
                    roomCode={String(roomCode)}
                    socket={socket}
                  />
                )
              }
            />
          </Box>
        </ModalContent>
      </Modal>
    </>
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
