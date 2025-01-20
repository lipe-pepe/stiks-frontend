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
import React from "react";
import { TfiWorld } from "react-icons/tfi";

interface Option {
  text: string;
  value: string;
}

interface LanguageMenuProps {
  variant: "header" | "menu";
}

const LanguageMenu: React.FC<LanguageMenuProps> = ({
  variant,
}: LanguageMenuProps) => {
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
          size={["xs", "xs", "sm"]}
          leftIcon={
            <Box pb={["2px", "0px"]}>
              <TfiWorld />
            </Box>
          }
          bgColor={variant === "header" ? "rgba(0, 0, 0, 0.2)" : "blue.base"}
          textTransform="uppercase"
          borderColor="white"
          borderRadius={[4, 4, 8]}
          borderWidth={[1, 1, 2]}
          textColor="white"
          fontWeight={500}
        >
          {locale}
        </Button>
      </MenuButton>
      <MenuList
        borderColor="base.dark"
        fontWeight={"semibold"}
        fontSize={["sm", "sm", "md"]}
      >
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
