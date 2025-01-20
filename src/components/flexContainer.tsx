import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface FlexContainerProps {
  scrollableContent: ReactNode;
  fixedEnd: ReactNode;
}

const FlexContainer: React.FC<FlexContainerProps> = ({
  scrollableContent,
  fixedEnd,
}: FlexContainerProps) => {
  return (
    <Flex
      flexDir="column"
      height="100%" // Certifica que o elemento usa toda a altura disponível
      overflow="hidden" // Impede que qualquer conteúdo saia
    >
      <Flex overflowY={"scroll"}>{scrollableContent}</Flex>
      {fixedEnd}
    </Flex>
  );
};

export default FlexContainer;
