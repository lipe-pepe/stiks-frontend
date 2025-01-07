import { Flex, Text } from "@chakra-ui/react";
import LanguageMenu from "./languageMenu";

import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("Header");

  return (
    <Flex py={4} justifyContent={"end"} alignItems={"center"} gap={"1rem"}>
      <Text fontSize={["xs", "sm"]} fontWeight={"bold"} textColor={"white"}>
        {t("how_to_play")}
      </Text>
      <LanguageMenu />
    </Flex>
  );
};

export default Header;
