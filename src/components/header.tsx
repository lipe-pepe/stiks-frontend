import { Flex, Text } from "@chakra-ui/react";
import LanguageMenu from "./languageMenu";

const Header = () => {
  return (
    <Flex>
      <Text>Como jogar</Text>
      <LanguageMenu />
    </Flex>
  );
};

export default Header;
