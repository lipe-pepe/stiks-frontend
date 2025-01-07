"use client";

import AvatarSelector from "@/components/avatarSelector";
import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import { MdMeetingRoom } from "react-icons/md";

interface JoinForm {
  avatar: string;
  name: string;
}

export default function JoinPage() {
  const t = useTranslations("JoinPage");

  const { register, handleSubmit, setValue } = useForm<JoinForm>();

  const onSubmit = (data: JoinForm) => {
    console.log(data);
  };

  return (
    <>
      <GridItem colSpan={[4]}>
        <Flex
          flexDir={"column"}
          bgColor={"rgba(0, 0, 0, 0.2)"}
          borderColor={"base.transparent"}
          borderWidth={"4px"}
          borderRadius={"1rem"}
          py={["2rem"]}
          px={["1rem"]}
          textColor={"white"}
          gap={["2rem"]}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text textAlign={"center"} fontWeight={700} fontSize={"lg"}>
              {t("form_title")}
            </Text>
            <Center>
              <AvatarSelector
                onSelect={(avatar) => setValue("avatar", avatar)}
              />
            </Center>
            <Box>
              <Text>{t("input_label")}</Text>
              <Input
                {...register("name")}
                bgColor={"white"}
                placeholder={t("input_placeholder")}
              ></Input>
              <Button
                size={"lg"}
                leftIcon={<MdMeetingRoom />}
                variant={"primary"}
                type="submit"
              >
                {t("join_button")}
              </Button>
            </Box>
          </form>
        </Flex>
      </GridItem>
    </>
  );
}
