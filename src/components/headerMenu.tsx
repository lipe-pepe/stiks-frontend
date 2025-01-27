import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import LanguageMenu from "./languageMenu";
import HowToPlayModal from "./modals/howToPlayModal";
import { useTranslations } from "next-intl";

const HeaderMenu = () => {
  const t = useTranslations("Header");
  const howToPlayModal = useDisclosure();
  return (
    <Menu>
      <MenuButton>
        <MdMenu color="white" size={"2rem"} />
      </MenuButton>
      <MenuList px={3} my={2} color={"black"}>
        <MenuItem
          bgColor={"none"}
          fontWeight={"medium"}
          px={0}
          onClick={howToPlayModal.onOpen}
          mb={2}
        >
          {t("how_to_play")}
        </MenuItem>

        <LanguageMenu />
      </MenuList>
      <HowToPlayModal
        isOpen={howToPlayModal.isOpen}
        onClose={howToPlayModal.onClose}
      />
    </Menu>
  );
};

export default HeaderMenu;
