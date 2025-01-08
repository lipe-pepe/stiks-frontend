import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import LanguageMenu from "./languageMenu";

const HeaderMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <MdMenu color="white" size={"2rem"} />
      </MenuButton>
      <MenuList px={3}>
        <MenuItem bgColor={"none"} px={0}>
          Como jogar
        </MenuItem>

        <LanguageMenu variant="menu" />
      </MenuList>
    </Menu>
  );
};

export default HeaderMenu;
