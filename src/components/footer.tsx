import { Flex, GridItem, Text } from "@chakra-ui/react";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
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
          w={"full"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={["column", "row"]}
          gap={[2]}
        >
          <Flex
            w={["1.5rem", "1.5rem", "2rem"]}
            h={["1.5rem", "1.5rem", "2rem"]}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <BsYoutube style={{ width: "100%", height: "100%" }} />
          </Flex>
          <Flex
            w={["100%", "50%", "40%", "30%"]}
            alignItems={"center"}
            justifyContent={["center", "space-between"]}
            flexDir={["column", "row"]}
            gap={[2]}
          >
            <Text>TERMOS DE SERVIÇO</Text>
            <Text>CONTATO</Text>
          </Flex>
        </Flex>
        <Text>Criado por Felipe Pêpe</Text>
      </Flex>
    </GridItem>
  );
};

export default Footer;
