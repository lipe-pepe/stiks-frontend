import { Flex, GridItem, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <GridItem colSpan={2} colStart={2} fontSize={"sm"}>
      <Flex textColor={"white"} flexDir={"column"}>
        <Flex></Flex>
        <Text>TERMOS DE SERVIÇO</Text>
        <Text>CONTATO</Text>
        <Text>Criado por Felipe Pêpe</Text>
      </Flex>
    </GridItem>
  );
};

export default Footer;
