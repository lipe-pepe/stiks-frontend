"use client";

import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import LanguageMenu from "./languageMenu";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { usePathname } from "@/i18n/routing";
import { MdArrowBack } from "react-icons/md";
import HeaderMenu from "./headerMenu";

const Header = () => {
  const t = useTranslations("Header");
  const pathname = usePathname();

  return (
    <Box py={4}>
      {pathname === "/" ? (
        <Flex gap={"1rem"} alignItems={"center"} justifyContent={"end"}>
          <Text fontSize={["sm"]} textColor={"white"} fontWeight={"semibold"}>
            {t("how_to_play")}
          </Text>
          <LanguageMenu variant="header" />
        </Flex>
      ) : (
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <MdArrowBack size={"2rem"} color="white" />
          <Image
            height={"1.25rem"}
            src="/images/logo/lightLogo.svg"
            alt="Stiks Logo"
          />
          <HeaderMenu />
        </Flex>
      )}
      {/* <Flex py={4} justifyContent={"end"} alignItems={"center"} gap={"1rem"}>
        <Text fontSize={["xs", "sm"]} fontWeight={"bold"} textColor={"white"}>
          {t("how_to_play")}
        </Text>
        <LanguageMenu />
      </Flex> */}
    </Box>
  );
};

export default Header;
