"use client";

import { ChatLog, ChatMessage } from "@/types/chat";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React from "react";

interface ChatMessagesProps {
  messages: (ChatMessage | ChatLog)[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
}: ChatMessagesProps) => {
  const t = useTranslations("Chat");

  // Type guard para diferenciar ChatMessage de ChatLog
  const isChatMessage = (
    message: ChatMessage | ChatLog
  ): message is ChatMessage => {
    return "player" in message && "message" in message && !("type" in message);
  };

  // Type guard para diferenciar ChatMessage de ChatLog
  const isChatLog = (message: ChatMessage | ChatLog): message is ChatLog => {
    return "player" in message && "message" in message && "type" in message;
  };

  return (
    <VStack
      height={"100%"}
      justifyContent={"end"}
      alignItems={"start"}
      textAlign={"start"}
      fontFamily={"inter"}
    >
      {messages.map((message, index) => (
        <Flex key={index}>
          {isChatMessage(message) && (
            <Text
              color={isChatMessage(message) ? "white" : "blue.base"}
              fontSize="sm"
            >
              <b>{message.player}</b>: {message.message}
            </Text>
          )}
          {isChatLog(message) && (
            <Text
              color={message.type == "join" ? "green.base" : "yellow.base"}
              fontSize="sm"
            >
              {t(message.message, {
                name: message.player,
                value: message.value,
              })}
            </Text>
          )}
        </Flex>
      ))}
    </VStack>
  );
};

export default ChatMessages;
