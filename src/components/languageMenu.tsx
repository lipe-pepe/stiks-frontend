"use client";

import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MdLanguage } from "react-icons/md";

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
          size={"sm"}
          variant={"secondary"}
          leftIcon={<MdLanguage />}
          bgColor={"rgba(0, 0, 0, 0.2)"}
          textTransform="uppercase"
        >
          {locale}
        </Button>
      </MenuButton>
      <MenuList
        bgColor={"base.darkest"}
        borderColor="white"
        textColor={"white"}
        fontWeight={"semibold"}
      >
        {options.map((opt, index) => (
          <MenuItem
            onClick={() => {
              changeLanguage(opt.value);
            }}
            key={index}
            bgColor={"base.darkest"}
          >
            {opt.text}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageMenu;
