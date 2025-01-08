"use client";

import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { HiPencil } from "react-icons/hi";
import { useTranslations } from "next-intl";
import { MdCheck } from "react-icons/md";

interface AvatarSelectorProps {
  onSelect: (value: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  onSelect,
}: AvatarSelectorProps) => {
  const t = useTranslations("JoinPage");

  const [selected, setSelected] = useState<string>("");
  const [avatars, setAvatars] = useState<string[] | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (avatar: string) => {
    setSelected(avatar);
    onSelect(avatar);
  };

  // Carrega os avatares
  useEffect(() => {
    async function fetchAvatars() {
      const response = await fetch("/api/avatars");
      const data = await response.json();
      setAvatars(data);
      // Seleciona um avatar aleatório por padrão
      const random = data[Math.floor(Math.random() * data.length)];
      handleSelect(random);
    }

    fetchAvatars();
  }, []);

  return (
    <>
      <Box
        cursor={"pointer"}
        position="relative"
        width={["12rem"]}
        height={["12rem"]}
        onClick={onOpen}
      >
        <Image alt={selected} src={`/images/avatars/${selected}`} />
        <Flex
          position="absolute"
          top={0}
          right={0}
          rounded="full"
          bgColor="white"
          justifyContent="center"
          alignItems="center"
          textColor="base.dark"
          zIndex={2}
          w={"4rem"}
          h={"4rem"}
        >
          <HiPencil size={"3rem"} />
        </Flex>
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          minW={"75vw"}
          maxH={"70vh"}
          mx={"1rem"}
          borderRadius={"16px"}
          borderColor={"base.transparent"}
          borderWidth={3}
        >
          <ModalHeader
            fontSize={"xl"}
            fontWeight={700}
            textColor={"blue.base"}
            textAlign={"center"}
          >
            {t("selector_title")}
          </ModalHeader>
          <ModalBody overflow={"scroll"}>
            <Grid
              templateColumns={[
                "repeat(2, 1fr)",
                "repeat(2, 1fr)",
                "repeat(4, 1fr)",
                "repeat(5, 1fr)",
              ]}
              gap={4}
            >
              {avatars?.map((avatar, index) => (
                <GridItem
                  onClick={() => {
                    handleSelect(avatar);
                  }}
                  key={index}
                  borderRadius={"12px"}
                  borderWidth={avatar === selected ? 4 : 2}
                  borderColor={
                    avatar === selected ? "green.base" : "rgba(0,0,0, 0.2)"
                  }
                  p={[2]}
                >
                  <Box position="relative">
                    <Image alt={avatar} src={`/images/avatars/${avatar}`} />
                    {avatar === selected && (
                      <Flex
                        position="absolute"
                        bottom={0}
                        right={0}
                        rounded="full"
                        borderColor={"green.dark"}
                        borderWidth={2}
                        bgColor="green.base"
                        justifyContent="center"
                        alignItems="center"
                        textColor="white"
                        zIndex={2}
                        w={"2rem"}
                        h={"2rem"}
                      >
                        <MdCheck size={"2rem"} />
                      </Flex>
                    )}
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button onClick={onClose} leftIcon={<MdCheck />} size={["lg"]}>
              {t("selector_button")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AvatarSelector;
