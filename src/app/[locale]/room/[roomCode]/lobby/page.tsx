"use client";

import ChatInput from "@/components/chatInput";
import ChatMessages from "@/components/chatMessages";
import FlexContainer from "@/components/flexContainer";
import InviteButton from "@/components/lobby/inviteButton";
import PlayerList from "@/components/lobby/playerList";
import MainBox from "@/components/mainBox";
import { useRoomContext } from "@/context/roomContext";
import { Player } from "@/types/player";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { MdVideogameAsset } from "react-icons/md";

const MAX_PLAYERS = 6;

export default function LobbyPage() {
  const t = useTranslations("LobbyPage");
  const { room, socket, chat } = useRoomContext();

  const [players, setPlayers] = useState<Player[]>(room?.players || []);
  const [playerName, setPlayerName] = useState<string>("");
  const [isHost, setIsHost] = useState<boolean>(false);

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
      });
    }
  }, []);

  const handleStartGame = async () => {
    if (socket) {
      socket.emit("host-started-game", {
        roomCode: room?.code,
      });
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
    <GridItem colSpan={[4, 6, 8, 8, 6]} colStart={[null, null, 3, 3, 4]}>
      <Text
        fontSize={"md"}
        fontWeight={"bold"}
        color={"white"}
        textAlign={"center"}
        mb={"1rem"}
      >
        {t("lobby_title")}
      </Text>
      <Tabs isFitted display={["block", "block", "none"]}>
        <TabList fontSize={"sm"}>
          <Tab
            _selected={{ bgColor: "base.darkest", textColor: "yellow.base" }}
            bgColor="base.transparent"
            borderTopRadius={12}
            textColor={"rgba(255,255,255,0.75)"}
            textTransform={"uppercase"}
            borderWidth={0}
          >
            {t("players_tab")}
          </Tab>
          <Tab
            _selected={{ bgColor: "base.darkest", textColor: "yellow.base" }}
            bgColor="base.transparent"
            borderTopRadius={12}
            textColor={"rgba(255,255,255,0.75)"}
            textTransform={"uppercase"}
          >
            {t("chat_tab")}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
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
                fixedEnd={<InviteButton text={t("invite_button")} />}
              />
            </MainBox>
          </TabPanel>
          <TabPanel p={0}>
            <MainBox borderTopRadius={[0]}>
              <ChatMessages messages={chat} />
              {socket !== null && (
                <ChatInput
                  playerName={playerName}
                  roomCode={String(room?.code)}
                  socket={socket}
                />
              )}
            </MainBox>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box display={["hidden", "hidden", "block"]}>
        <MainBox>
          <FlexContainer
            scrollableContent={
              <PlayerList
                players={players}
                maxPlayers={MAX_PLAYERS}
                onKickPlayer={onKickPlayer}
                isHost={isHost}
              />
            }
            fixedEnd={<InviteButton text={t("invite_button")} />}
          />
        </MainBox>
      </Box>
      {isHost && (
        <Center mt={["1rem"]}>
          <Button
            size={"md"}
            leftIcon={<MdVideogameAsset />}
            variant={"primary"}
            onClick={() => handleStartGame()}
          >
            {t("start_button")}
          </Button>
        </Center>
      )}
    </GridItem>
  );
}
