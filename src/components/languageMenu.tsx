"use client";

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { TfiWorld } from "react-icons/tfi";

interface Option {
  text: string;
  value: string;
}

const LanguageMenu = () => {
  const router = useRouter();
  const { locale } = useParams();
  const pathname = usePathname();

  const options: Option[] = [
    {
      text: "English",
      value: "en",
    },
    {
      text: "Português",
      value: "pt",
    },
  ];

  const changeLanguage = (locale: string) => {
    const newPath = pathname.replace(/^\/[^/]+/, `/${locale}`);
    router.replace(newPath);
  };

  return (
    <Menu>
      <MenuButton>
        <Button
          size={["xs", "sm", "md"]}
          leftIcon={
            <Box pb={["2px", "0px"]}>
              <TfiWorld />
            </Box>
          }
          bgColor={"rgba(0, 0, 0, 0.2)"}
          textTransform="uppercase"
          borderColor="white"
          borderRadius={4}
          borderWidth="1px"
          textColor="white"
          fontWeight={500}
        >
          {locale}
        </Button>
      </MenuButton>
      <MenuList borderColor="base.dark" fontWeight={"semibold"} fontSize={"sm"}>
        {options.map((opt, index) => (
          <MenuItem
            onClick={() => {
              changeLanguage(opt.value);
            }}
            key={index}
            bgColor={"white"}
            textColor={opt.value === locale ? "blue.base" : "black"}
            fontWeight={opt.value === locale ? "bold" : "regular"}
          >
            {opt.text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageMenu;
