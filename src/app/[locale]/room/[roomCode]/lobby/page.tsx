"use client";

import ChatInput from "@/components/chat/chatInput";
import ChatMessages from "@/components/chat/chatMessages";
import ErrorMessage from "@/components/errorMessage";
import FlexContainer from "@/components/flexContainer";
import InviteButton from "@/components/lobby/inviteButton";
import PlayerList from "@/components/lobby/playerList";
import MainBox from "@/components/mainBox";
import { useRoomContext } from "@/context/roomContext";
import createMatch from "@/services/matches/createMatch";
import { Player } from "@/types/player";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  Box,
  Button,
  Center,
  GridItem,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdVideogameAsset } from "react-icons/md";

const MAX_PLAYERS = 6;

export default function LobbyPage() {
  const t = useTranslations("LobbyPage");
  const { room, socket, chat } = useRoomContext();
  const { roomCode } = useParams(); // Pega o código da sala da URL

  const [players, setPlayers] = useState<Player[]>(room?.players || []);
  const [playerName, setPlayerName] = useState<string>("");
  const [isHost, setIsHost] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Atualiza os jogadores sempre que a sala muda
  useEffect(() => {
    setPlayers(room?.players || []);
  }, [room]);

  // Seta o nome do jogador atual sempre que carregam os novos jogadores
  useEffect(() => {
    const id = getSavedPlayerId();
    const p = players.find((p) => p.id === id);
    setPlayerName(p?.name || "");
    setIsHost(p?.role === "host");
  }, [players]);

  useEffect(() => {});

  // Quando o jogador entra no lobby, ele deve enviar um socket emitindo a entrada.
  useEffect(() => {
    if (socket) {
      socket.emit("player-joined", {
        roomCode: room?.code,
        playerId: getSavedPlayerId(),
      });
    }
  }, []);

  const handleStartGame = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const res = await createMatch(String(roomCode));
      if (res.status === 201 && socket) {
        socket.emit("host-started-game", {
          roomCode: room?.code,
        });
      } else {
        console.log(res);
        setIsLoading(false);
        setError(t(`error.${res.data.error}`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onKickPlayer = () => {
    // Emite para o backend o evento de que o player saiu da sala
    if (socket) {
      socket.emit("player-left", {
        roomCode: room?.code,
      });
    }
  };

  return (
    <GridItem
      colSpan={[4, 6, 12, null, 10]}
      colStart={[null, null, null, null, 2]}
    >
      <Text
        fontSize={["md", "md", "lg"]}
        fontWeight={"bold"}
        color={"white"}
        textAlign={"center"}
        mb={["1rem", "1rem", "2rem"]}
      >
        {t("lobby_title")}
      </Text>

      <Tabs isFitted display={["block", "block", "none"]}>
        <TabList fontSize={"sm"}>
          <Tab
            _selected={{
              bgColor: "base.darkest",
              textColor: "yellow.base",
              fontWeight: "semibold",
            }}
            bgColor="base.transparent"
            borderTopRadius={12}
            textColor={"rgba(255,255,255,0.75)"}
            textTransform={"uppercase"}
            borderWidth={0}
          >
            {t("players")}
          </Tab>
          <Tab
            _selected={{
              bgColor: "base.darkest",
              textColor: "yellow.base",
              fontWeight: "semibold",
            }}
            bgColor="base.transparent"
            borderTopRadius={12}
            textColor={"rgba(255,255,255,0.75)"}
            textTransform={"uppercase"}
          >
            {t("chat")}
          </Tab>
        </TabList>
        <TabPanels h={"60vh"}>
          <TabPanel h={"100%"} p={0}>
            <MainBox borderTopRadius={[0]}>
              <FlexContainer
                scrollableContent={
                  <PlayerList
                    players={players}
                    maxPlayers={MAX_PLAYERS}
                    onKickPlayer={onKickPlayer}
                    isHost={isHost}
                  />
                }
                fixedEnd={
                  <InviteButton
                    text={t("invite_button")}
                    copiedText={t("copied")}
                  />
                }
              />
            </MainBox>
          </TabPanel>
          <TabPanel h={"100%"} p={0}>
            <MainBox height="100%" borderTopRadius={[0]}>
              <FlexContainer
                fixedStart={<Box />}
                scrollableContent={<ChatMessages messages={chat} />}
                fixedEnd={
                  socket !== null && (
                    <ChatInput
                      playerName={playerName}
                      roomCode={String(room?.code)}
                      socket={socket}
                    />
                  )
                }
              />
            </MainBox>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box display={["none", "none", "block"]}>
        <MainBox height="70vh">
          <HStack h={"100%"} w={"100%"} gap={"2rem"}>
            <Box
              flex="1"
              p={"1rem"}
              height={"100%"}
              borderRadius={12}
              borderWidth={2}
              borderColor={"base.darkest"}
            >
              <FlexContainer
                fixedStart={
                  <Text
                    textAlign="center"
                    fontSize={"sm"}
                    textTransform={"uppercase"}
                    fontWeight={"semibold"}
                    color="white"
                  >{`${t("players")} (${players.length}/${MAX_PLAYERS})`}</Text>
                }
                scrollableContent={
                  <PlayerList
                    players={players}
                    maxPlayers={MAX_PLAYERS}
                    onKickPlayer={onKickPlayer}
                    isHost={isHost}
                  />
                }
                fixedEnd={
                  <InviteButton
                    text={t("invite_button")}
                    copiedText={t("copied")}
                  />
                }
              />
            </Box>
            <VStack height={"100%"}>
              <Box
                p={"1rem"}
                height={"100%"}
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
                        playerName={playerName}
                        roomCode={String(room?.code)}
                        socket={socket}
                      />
                    )
                  }
                />
              </Box>
              {isHost && (
                <VStack justifyContent={"center"} h={"30%"} gap={"1rem"}>
                  {error && <ErrorMessage message={error} />}
                  <Center>
                    <Button
                      size={"lg"}
                      leftIcon={<MdVideogameAsset />}
                      variant={"primary"}
                      onClick={() => handleStartGame()}
                      isLoading={isLoading}
                    >
                      {t("start_button")}
                    </Button>
                  </Center>
                </VStack>
              )}
            </VStack>
          </HStack>
        </MainBox>
      </Box>
      {isHost && (
        <VStack display={["flex", "flex", "none"]} mt={["1rem"]} gap={"1rem"}>
          {error && <ErrorMessage message={error} />}
          <Center>
            <Button
              size={"md"}
              leftIcon={<MdVideogameAsset />}
              variant={"primary"}
              onClick={() => handleStartGame()}
              isLoading={isLoading}
            >
              {t("start_button")}
            </Button>
          </Center>
        </VStack>
      )}
    </GridItem>
  );
}
