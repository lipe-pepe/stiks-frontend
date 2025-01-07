"use client";

import { useTranslations } from "next-intl";
import { Button, Flex, GridItem, Image } from "@chakra-ui/react";

import { MdVideogameAsset } from "react-icons/md";
import createRoom from "@/services/rooms/createRoom";
import { useRouter } from "@/i18n/routing";

import HomeCarousel from "@/components/homeCarousel";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const handleCreateRoom = async () => {
    try {
      const res = await createRoom();
      if (res.status === 201) {
        router.push(`/room/${res.data.room.code}/join`);
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
      <GridItem
        colSpan={2}
        colStart={[2, 3]}
        my={["1.5rem"]}
        alignSelf={"self-start"}
      >
        <Image src="/images/logo/mainLogo.svg" alt="Stiks Logo" fit={"cover"} />
      </GridItem>
      <GridItem colSpan={[4, 6]} colStart={[1, 1]}>
        <Flex
          flexDir={"column"}
          bgColor={"rgba(0, 0, 0, 0.2)"}
          borderColor={"base.transparent"}
          borderWidth={"4px"}
          borderRadius={"1rem"}
          py={["2rem"]}
          px={["1rem"]}
        >
          {/* <Box height={"300px"}>PLACEHOLDER CARROSSEL</Box> */}
          <HomeCarousel />
          <Button
            onClick={() => {
              handleCreateRoom();
            }}
            variant={"primary"}
            size={["lg"]}
            leftIcon={<MdVideogameAsset />}
            mx={["1.5rem"]}
          >
            {t("create_room_button")}
          </Button>
        </Flex>
      </GridItem>
    </>
  );
}
