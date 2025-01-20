import { Flex } from "@chakra-ui/react";
import React from "react";

interface MainBoxProps {
  children: React.ReactNode;
  pt?: string[];
  pb?: string[];
  pl?: string[];
  pr?: string[];
  borderTopRadius?: string[] | number[];
  borderBottomRadius?: string[] | number[];
}

const MainBox: React.FC<MainBoxProps> = ({
  children,
  pt,
  pb,
  pl,
  pr,
  borderTopRadius,
  borderBottomRadius,
}: MainBoxProps) => {
  return (
    <Flex
      flexDirection="column"
      bgColor={"rgba(0, 0, 0, 0.2)"}
      borderColor={"base.transparent"}
      borderWidth={"4px"}
      borderTopRadius={borderTopRadius || ["1rem"]}
      borderBottomRadius={borderBottomRadius || ["1rem"]}
      pt={pt || ["1rem"]}
      pb={pb || ["1rem"]}
      pl={pl || ["1rem"]}
      pr={pr || ["1rem"]}
      maxH={"70vh"}
      height="100%" // Certifica que o MainBox usa toda a altura disponível
    >
      {children}
    </Flex>
  );
};

export default MainBox;
