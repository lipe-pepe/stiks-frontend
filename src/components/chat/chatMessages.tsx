"use client";

import { ChatMessage } from "@/types/chat";
import { Text, VStack } from "@chakra-ui/react";
import React from "react";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
}: ChatMessagesProps) => {
  return (
    <VStack
      height={"100%"}
      justifyContent={"end"}
      alignItems={"start"}
      textAlign={"start"}
      fontFamily={"inter"}
    >
      {messages.map((message, index) => (
        <Text key={index} color={"white"} fontSize={"sm"}>
          <b>{message.player}</b>: {message.message}
        </Text>
      ))}
    </VStack>
  );
};

export default ChatMessages;
