"use client";

import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { TfiWorld } from "react-icons/tfi";

interface Option {
  text: string;
  value: string;
}

const LanguageMenu: React.FC = () => {
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
      <MenuButton
        borderRadius={12}
        _hover={{
          bgColor: "rgba(0, 0, 0, 0.2)",
          transform: "scale(1.05)", // Cresce 5% no hover
          transition: "transform 0.2s ease-in-out, bgColor 0.2s ease-in-out", // Adiciona suavidade à animação
        }}
      >
        <HStack
          color={"white"}
          fontWeight={"bold"}
          fontFamily={"quicksand"}
          textTransform={"uppercase"}
          borderWidth={[0, null, 2]}
          borderColor={"white"}
          bgColor={["blue.base", null, "base.transparent"]}
          py={[1]}
          px={[2]}
          borderRadius={[6]}
        >
          <TfiWorld />
          <Text fontSize="sm">{locale}</Text>
        </HStack>
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
            {`${opt.text} (${opt.value.toUpperCase()})`}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageMenu;
