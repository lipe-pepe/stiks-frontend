import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface FlexContainerProps {
  fixedStart?: ReactNode;
  scrollableContent: ReactNode;
  fixedEnd: ReactNode;
}

const FlexContainer: React.FC<FlexContainerProps> = ({
  fixedStart,
  scrollableContent,
  fixedEnd,
}: FlexContainerProps) => {
  return (
    <Flex
      flexDir="column"
      gap={["1rem"]}
      height="100%" // Certifica que o elemento usa toda a altura disponível
      overflow="hidden" // Impede que qualquer conteúdo saia
    >
      {fixedStart}
      <Flex overflowY={"scroll"}>{scrollableContent}</Flex>
      {fixedEnd}
    </Flex>
  );
};

export default FlexContainer;
