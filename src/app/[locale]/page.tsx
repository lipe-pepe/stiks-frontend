"use client";

import { useTranslations } from "next-intl";
import { Button, GridItem, Image } from "@chakra-ui/react";

import { MdVideogameAsset } from "react-icons/md";
import createRoom from "@/services/rooms/createRoom";
import { useRouter } from "@/i18n/routing";

import HomeCarousel from "@/components/homeCarousel";
import MainBox from "@/components/mainBox";

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
      <GridItem colSpan={2} colStart={[2, 3]} mb={"2rem"} alignSelf={"center"}>
        <Image src="/images/logo/mainLogo.svg" alt="Stiks Logo" fit="cover" />
      </GridItem>
      <GridItem colSpan={[4, 6]} colStart={[1, 1]}>
        <MainBox pt={["2rem"]} pb={["2rem"]}>
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
        </MainBox>
      </GridItem>
    </>
  );
}
