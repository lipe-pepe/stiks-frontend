import { Flex, GridItem, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <GridItem
      colSpan={2}
      colStart={2}
      textColor={"white"}
      fontSize={["xs"]}
      py={[3]}
    >
      <Flex alignItems={"center"} flexDir={"column"} gap={[6]}>
        <Flex alignItems={"center"} flexDir={"column"} gap={[2]}>
          <Text>TERMOS DE SERVIÇO</Text>
          <Text>CONTATO</Text>
        </Flex>
        <Text>Criado por Felipe Pêpe</Text>
      </Flex>
    </GridItem>
  );
};

export default Footer;
