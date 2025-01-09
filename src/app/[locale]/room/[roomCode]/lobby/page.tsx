"use client";

import MainBox from "@/components/mainBox";
import { useRoomContext } from "@/context/roomContext";
import { Player } from "@/types/player";
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
  const { room } = useRoomContext();

  const [players, setPlayers] = useState<Player[]>(room?.players || []);

  useEffect(() => {
    // Atualiza os jogadores sempre que a sala muda
    setPlayers(room?.players || []);
  }, [room]);

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
              >
                {t("invite_button")}{" "}
              </Button>
            </MainBox>
          </TabPanel>
          <TabPanel p={0}>
            <MainBox borderTopRadius={[0]}>
              <Text></Text>
            </MainBox>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </GridItem>
  );
}
