"use client";

import { useTranslations } from "next-intl";
import { Button, GridItem, Image } from "@chakra-ui/react";

import { MdVideogameAsset } from "react-icons/md";
import createRoom from "@/services/rooms/createRoom";
import { useRouter } from "@/i18n/routing";

import MainBox from "@/components/mainBox";
import { useState } from "react";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleCreateRoom = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const res = await createRoom();
      if (res.status === 201) {
        router.push(`/room/${res.data.room.code}/join?role=host`);
      } else {
        setError(t(`error.${res.data.error}`));
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <GridItem
        colSpan={[2]}
        colStart={[2, 3, 6]}
        mb={"2rem"}
        alignSelf={"center"}
      >
        <Image src="/images/logo/mainLogo.svg" alt="Stiks Logo" fit="cover" />
      </GridItem>
      <GridItem colSpan={[4, 6, 8, 8, 8]} colStart={[null, null, 3, 3, 3]}>
        <MainBox pt={["2rem"]} pb={["2rem"]}>
          <Button
            onClick={() => {
              handleCreateRoom();
            }}
            variant={"primary"}
            size={["lg"]}
            leftIcon={<MdVideogameAsset />}
            mx={["1.5rem"]}
            isLoading={isLoading}
          >
            {t("create_room_button")}
          </Button>
        </MainBox>
      </GridItem>
    </>
  );
}
