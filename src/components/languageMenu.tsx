import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { MdLanguage } from "react-icons/md";

const LanguageMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <Button size={"sm"} variant={"secondary"} leftIcon={<MdLanguage />}>
          TESTE
        </Button>
      </MenuButton>
      <MenuList></MenuList>
    </Menu>
  );
};

export default LanguageMenu;
