"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LanguageMenu from "./languageMenu";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { MdArrowBack } from "react-icons/md";
import HeaderMenu from "./headerMenu";

const Header = () => {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box py={4}>
      {pathname === "/" ? (
        <Flex
          gap={["1rem", "2rem", "3rem"]}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <Text
            fontSize={["sm", "sm", "md"]}
            textColor={"white"}
            fontWeight={"semibold"}
          >
            {t("how_to_play")}
          </Text>
          <LanguageMenu variant="header" />
        </Flex>
      ) : (
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <MdArrowBack size={"2rem"} color="white" onClick={onOpen} />
          <Image
            height={"1.25rem"}
            src="/images/logo/lightLogo.svg"
            alt="Stiks Logo"
          />
          <HeaderMenu />
        </Flex>
      )}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={"1rem"} borderColor={"red.dark"} borderWidth={[2]}>
          <ModalHeader>{t("leave_modal_title")}</ModalHeader>
          <ModalBody>{t("leave_modal_body")}</ModalBody>
          <ModalFooter gap={"1rem"}>
            <Button onClick={onClose}>{t("leave_modal_button_cancel")}</Button>
            <Button
              bgColor={"red.base"}
              onClick={() => {
                router.push("/");
                onClose();
              }}
            >
              {t("leave_modal_button_leave")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
