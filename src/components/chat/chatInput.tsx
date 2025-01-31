"use client";

import { ChatMessage } from "@/types/chat";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdChatBubbleOutline, MdSend } from "react-icons/md";
import { Socket } from "socket.io-client";

interface ChatInputProps {
  playerName: string;
  socket: Socket;
  roomCode: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  playerName,
  socket,
  roomCode,
}: ChatInputProps) => {
  const t = useTranslations("Chat");
  const { register, handleSubmit, setValue, resetField } =
    useForm<ChatMessage>();

  const onSubmit = handleSubmit(async (data) => {
    if (socket) {
      socket.emit("chat-message-sent", {
        roomCode: roomCode,
        player: data.player,
        message: data.message,
      });
      resetField("message");
    }
  });

  useEffect(() => {
    setValue("player", playerName);
  }, [playerName, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <InputGroup fontFamily={"inter"}>
        <InputLeftElement color={"gray.1"}>
          <MdChatBubbleOutline />
        </InputLeftElement>
        <Input
          {...register("message")}
          placeholder={t("input_placeholder")}
          bgColor={"white"}
          focusBorderColor="transparent"
        ></Input>
        <InputRightElement>
          <IconButton
            type="submit"
            bgColor={"white"}
            color={"blue.base"}
            aria-label="Send message button"
            icon={<MdSend />}
            _hover={{ bgColor: "white", color: "blue.darkest" }}
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default ChatInput;
