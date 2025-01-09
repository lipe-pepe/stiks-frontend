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

interface ChatInputProps {
  playerName: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  playerName,
}: ChatInputProps) => {
  const t = useTranslations("Chat");
  const { register, handleSubmit, setValue } = useForm<ChatMessage>();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  useEffect(() => {
    setValue("player", playerName);
  }, [playerName, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <InputGroup>
        <InputLeftElement color={"gray.1"}>
          <MdChatBubbleOutline />
        </InputLeftElement>
        <Input
          {...register("message")}
          placeholder={t("input_placeholder")}
          bgColor={"white"}
        ></Input>
        <InputRightElement>
          <IconButton
            type="submit"
            bgColor={"white"}
            color={"blue.base"}
            aria-label="Send message button"
            icon={<MdSend />}
          />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default ChatInput;
