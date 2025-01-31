"use client";

import AvatarSelector from "@/components/avatarSelector";
import MainBox from "@/components/mainBox";
import { useRoomContext } from "@/context/roomContext";
import { useRouter } from "@/i18n/routing";
import createPlayer from "@/services/players/createPlayer";
import { PlayerCreation, PlayerRole } from "@/types/player";
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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { MdMeetingRoom } from "react-icons/md";

export default function JoinPage() {
  const t = useTranslations("JoinPage");
  const router = useRouter();
  const { room } = useRoomContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const role = useSearchParams().get("role");
  const validatedRole = Object.keys(PlayerRole).includes(role ?? "")
    ? (PlayerRole[role as keyof typeof PlayerRole] as PlayerRole)
    : PlayerRole.player;

  useEffect(() => {
    setValue("role", validatedRole);
  }, [validatedRole]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PlayerCreation>();

  if (!room) {
    return <h1>Loading...</h1>;
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const response = await createPlayer(room.code, data);
      if (response.status === 201) {
        localStorage.setItem("playerId", response.data.player._id);
        router.push(`/room/${room.code}/lobby`);
      } else {
        setIsLoading(false);

        throw new Error(
          "An error occurred while creating the player: " +
            response.data.message
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error joining room: ", error);
    }
  });

  return (
    <>
      <GridItem
        colSpan={[4, 6, 8, 8, 6]}
        colStart={[null, null, 3, 3, 4]}
        // bgColor={"turquoise"} // Used for debug
      >
        <form onSubmit={onSubmit}>
          <MainBox pt={["2rem", "3rem"]} pb={["2rem", "3rem", "3rem", "4rem"]}>
            <Flex
              flexDir={"column"}
              textColor={"white"}
              gap={["2rem", "2rem", "3rem"]}
            >
              <Text textAlign={"center"} fontWeight={700} fontSize={"lg"}>
                {t("form_title")}
              </Text>
              <Flex
                flexDir={["column", "column", "column", "row"]}
                gap={["2rem", "2rem", "2rem", "4rem"]}
                justifyContent={"center"}
              >
                <Center>
                  <AvatarSelector
                    onSelect={(avatar) => setValue("avatar", avatar)}
                  />
                </Center>
                <Flex flexDir={"column"} gap={2}>
                  <Text>{t("input_label")}</Text>
                  <Input
                    {...register("name", {
                      required: t("error_required_name"),
                      maxLength: {
                        value: 20,
                        message: t("error_name_length"),
                      },
                    })}
                    py={6}
                    size={["md", "md", "md", "md", "lg"]}
                    bgColor={"white"}
                    borderRadius={"12px"}
                    borderColor={errors.name ? "red.base" : "white"}
                    borderWidth={errors.name ? 3 : 0}
                    placeholder={t("input_placeholder")}
                  ></Input>
                  {errors.name && (
                    <Flex color={"red.base"} alignItems={"center"} gap={2}>
                      <Flex
                        rounded="full"
                        borderColor="red.dark"
                        borderWidth={1}
                        bgColor="red.base"
                        justifyContent="center"
                        alignItems="center"
                        textColor="white"
                        minW={"1.25rem"}
                        maxH={"1.25rem"}
                      >
                        !
                      </Flex>
                      <Text
                        color="white"
                        fontSize={["sm", "sm", "sm", "md"]}
                        mt={1}
                      >
                        {errors.name.message}
                      </Text>
                    </Flex>
                  )}
                  <Button
                    mt={"1.8rem"}
                    size={"lg"}
                    leftIcon={
                      <Box mb={1}>
                        <MdMeetingRoom />
                      </Box>
                    }
                    variant={"primary"}
                    type="submit"
                    isLoading={isLoading}
                  >
                    {t("join_button")}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </MainBox>
        </form>
      </GridItem>
    </>
  );
}
