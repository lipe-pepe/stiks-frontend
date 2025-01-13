"use client";

import ChatInput from "@/components/chatInput";
import ChatMessages from "@/components/chatMessages";
import MainBox from "@/components/mainBox";
import { useRoomContext } from "@/context/roomContext";
import { Player } from "@/types/player";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  Button,
  Flex,
  GridItem,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlinePerson, MdSend } from "react-icons/md";
import { SlOptions } from "react-icons/sl";

const MAX_PLAYERS = 6;
interface PlayerDisplayProps {
  player: Player | null;
  emptyString: string;
}
const PlayerDisplay: React.FC<PlayerDisplayProps> = ({
  player,
  emptyString,
}: PlayerDisplayProps) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={player != null ? "space-between" : "normal"}
      color={player != null ? "white" : "base.darkest"}
    >
      <Flex alignItems={"center"} gap={["1rem"]}>
        {player != null ? (
          <Image
            height={"5rem"}
            src={`/images/avatars/${player.avatar}`}
            alt={`Player ${player.name} avatar`}
          />
        ) : (
          <MdOutlinePerson size={"4.75rem"} />
        )}

        <Text
          fontSize={["sm"]}
          fontStyle={player != null ? "italic" : "normal"}
          fontWeight={player != null ? "semibold" : "normal"}
          textTransform={player != null ? "none" : "uppercase"}
        >
          {player?.name || emptyString}
        </Text>
      </Flex>
      {player != null && <SlOptions size={"1.5rem"} color="width" />}
    </Flex>
  );
};

export default function LobbyPage() {
  const t = useTranslations("LobbyPage");
  const { room, socket, chat } = useRoomContext();
  const { locale } = useParams();

  const [players, setPlayers] = useState<Player[]>(room?.players || []);
  const [playerName, setPlayerName] = useState<string>("");

  // Atualiza os jogadores sempre que a sala muda
  useEffect(() => {
    setPlayers(room?.players || []);
  }, [room]);

  // Seta o nome do jogador atual sempre que carregam os novos jogadores
  useEffect(() => {
    const id = getSavedPlayerId();
    const p = players.find((p) => p._id === id);
    setPlayerName(p?.name || "");
  }, [players]);

  // Quando o jogador entra no lobby, ele deve enviar um socket emitindo a entrada.
  useEffect(() => {
    if (socket) {
      socket.emit("player-joined", {
        roomCode: room?.code,
      });
    }
  }, []);

  const handleInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.host}/${locale}/room/${room?.code}/join/`
      );
    } catch (error) {
      console.error("Fail copying text:", error);
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
      <Tabs isFitted>
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
              <Flex
                flexDir={"column"}
                borderBottomRadius={"16px"}
                borderTopRadius={0}
                textColor={"white"}
                gap={["2rem", "2rem", "3rem"]}
                p={["1rem"]}
                overflow={"scroll"}
              >
                {players.map((player, index) => (
                  <PlayerDisplay
                    key={index}
                    player={player}
                    emptyString={t("empty_player")}
                  />
                ))}
                {Array.from(
                  { length: MAX_PLAYERS - players.length },
                  (_, index) => (
                    <PlayerDisplay
                      key={index}
                      player={null}
                      emptyString={t("empty_player")}
                    />
                  )
                )}
              </Flex>
              <Button
                mt={"1rem"}
                textTransform={"uppercase"}
                leftIcon={<MdSend />}
                size={"md"}
                variant={"secondary"}
                onClick={handleInviteLink}
              >
                {t("invite_button")}{" "}
              </Button>
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
    </GridItem>
  );
}
