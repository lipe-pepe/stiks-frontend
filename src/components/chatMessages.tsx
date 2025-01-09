"use client";

import { ChatMessage } from "@/types/chat";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
}: ChatMessagesProps) => {
  return (
    <Flex flexDir={"column"} overflow={"scroll"}>
      {messages.map((message, index) => (
        <Text key={index} color={"white"} fontSize={"sm"}>
          <b>{message.player}</b>: {message.message}
        </Text>
      ))}
    </Flex>
  );
};

export default ChatMessages;
