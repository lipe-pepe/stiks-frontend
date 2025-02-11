"use client";

import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LanguageMenu from "./languageMenu";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { MdArrowBack } from "react-icons/md";
import HeaderMenu from "./headerMenu";
import LeaveModal from "./modals/leaveModal";
import HowToPlayModal from "./modals/howToPlayModal";
import useSound from "use-sound";

const Header = () => {
  const t = useTranslations("Header");
  const pathname = usePathname();

  const leaveModal = useDisclosure();
  const howToPlayModal = useDisclosure();

  const [playLeaveModal] = useSound("/sounds/attention.mp3");

  return (
    <Box py={4} textColor={"white"} fontWeight={"semibold"}>
      <HStack
        justifyContent={pathname === "/" ? "end" : "space-between"}
        position={"relative"}
      >
        {/* BACK BUTTON */}
        <HStack
          display={pathname === "/" ? "none" : "flex"}
          onClick={() => {
            leaveModal.onOpen();
            playLeaveModal();
          }}
          borderRadius={[10]}
          px={[0, null, 3]}
          py={[1]}
          cursor={"pointer"}
          bgColor={"transparent"}
          _hover={{
            transform: "scale(1.05)", // Cresce 5% no hover
            bgColor: "base.transparent",
            transition: "transform 0.2s ease-in-out, bgColor 0.2s ease-in-out", // Adiciona suavidade à animação
          }}
        >
          <MdArrowBack size={"2rem"} />
          <Text display={["none", "none", "block"]}>{t("back")}</Text>
        </HStack>
        {/* LOGO */}
        <Center
          display={pathname === "/" ? "none" : "flex"}
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
        >
          <Image
            height={["1.25rem", null, "1.5rem", "1.6rem"]}
            src="/images/logo/lightLogo.svg"
            alt="Stiks Logo"
          />
        </Center>
        <Box display={["block", "block", "none"]}>
          <HeaderMenu />
        </Box>
        <HStack
          display={["none", "none", "flex"]}
          gap={"3rem"}
          alignItems={"center"}
          justifyContent={"end"}
        >
          {/* HOW TO PLAY BUTTON */}
          <Text
            onClick={howToPlayModal.onOpen}
            borderRadius={[10]}
            px={[3]}
            py={[2]}
            cursor={"pointer"}
            bgColor={"transparent"}
            _hover={{
              transform: "scale(1.05)", // Cresce 5% no hover
              bgColor: "base.transparent",
              transition:
                "transform 0.2s ease-in-out, bgColor 0.2s ease-in-out", // Adiciona suavidade à animação
            }}
            fontSize={["sm", "sm", "md"]}
          >
            {t("how_to_play")}
          </Text>
          <LanguageMenu />
        </HStack>
      </HStack>

      <LeaveModal isOpen={leaveModal.isOpen} onClose={leaveModal.onClose} />
      <HowToPlayModal
        isOpen={howToPlayModal.isOpen}
        // isOpen={true}
        onClose={howToPlayModal.onClose}
      />
    </Box>
  );
};

export default Header;
