"use client";

import { useTranslations } from "next-intl";
import { Box, Button, Flex, GridItem, Image } from "@chakra-ui/react";

import { MdVideogameAsset } from "react-icons/md";
import createRoom from "@/services/rooms/createRoom";
import { useRouter } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const handleCreateRoom = async () => {
    try {
      const res = await createRoom();
      if (res.status === 201) {
        router.push(`/room/${res.data.room.code}`);
      } else {
        // TODO: EXIBIR O ERRO SE DER ERRADO!
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <GridItem colSpan={2} colStart={2}>
        <Image src="/images/logo/mainLogo.svg" alt="Stiks Logo" />
      </GridItem>
      <GridItem colSpan={4}>
        <Flex
          flexDir={"column"}
          bgColor={"rgba(0, 0, 0, 0.2)"}
          borderColor={"base.transparent"}
          borderWidth={"4px"}
          borderRadius={"1rem"}
        >
          <Box height={"300px"}>PLACEHOLDER CARROSSEL</Box>
          <Button
            onClick={() => {
              handleCreateRoom();
            }}
            variant={"primary"}
            leftIcon={<MdVideogameAsset />}
          >
            {t("create_room_button")}
          </Button>
        </Flex>
      </GridItem>
    </>
  );
}
