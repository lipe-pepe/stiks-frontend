import { Flex, GridItem, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <GridItem
      colSpan={2}
      colStart={2}
      textColor={"white"}
      fontSize={["xs", "xs", "sm"]}
      mt={[8]}
      mb={[3]}
      textAlign={"center"}
    >
      <Flex alignItems={"center"} flexDir={"column"} gap={[6, 12]} w={"full"}>
        <Flex
          textTransform={"uppercase"}
          w={"full"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          flexDir={["column", "row"]}
          gap={[2]}
        >
          <Text cursor={"pointer"}>{t("terms")}</Text>
          <Text cursor={"pointer"}>{t("contact")}</Text>
        </Flex>
        <Text>{t("credits")}</Text>
      </Flex>
    </GridItem>
  );
};

export default Footer;
