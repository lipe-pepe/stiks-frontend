"use client";

import { useTranslations } from "next-intl";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { MdVideogameAsset } from "react-icons/md";
import createRoom from "@/services/rooms/createRoom";
import { useRouter } from "@/i18n/routing";

import { useState } from "react";
import ErrorMessage from "@/components/errorMessage";

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
    <GridItem
      colSpan={[4, 4, 6]}
      colStart={[null, 2, 4]}
      color={"white"}
      w="100%"
      textAlign={"center"}
    >
      <VStack gap={4} w="100%">
        {/* Imagem ajustada para ocupar 100% da largura disponível */}
        <Image
          src="/images/logo/mainLogo.svg"
          alt="Stiks! Logo"
          maxW={["80%", null, "320px"]}
          objectFit="contain"
        />

        {/* Texto ajustado para ocupar toda a largura */}
        <Text
          textAlign="center"
          textTransform="uppercase"
          whiteSpace="nowrap"
          fontSize={["lg", null, "xl"]}
          w="100%"
          fontWeight={700}
        >
          {t("subtitle")}
        </Text>

        {/* Botão centralizado e ocupando toda a largura */}
        <Flex w="100%" justify="center">
          <Button
            mt={[8]}
            w="100%" // Ocupa toda a largura disponível
            maxW="300px" // Define um limite máximo para não ficar muito grande em telas largas
            onClick={handleCreateRoom}
            leftIcon={
              <Box mb={1}>
                <MdVideogameAsset />
              </Box>
            }
            isLoading={isLoading}
            size={["md", null, "lg"]}
          >
            {t("create_room_button")}
          </Button>
        </Flex>
        {error && <ErrorMessage message={error} />}
      </VStack>
    </GridItem>
  );
}
