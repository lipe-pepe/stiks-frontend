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
      <Flex
        flex="1" // Permite que este Flex cresça para ocupar o espaço disponível
        minHeight={0} // Garante que o flex container pode encolher corretamente
        overflowY="auto" // Define o comportamento de scroll para o eixo Y
      >
        {scrollableContent}
      </Flex>
      {fixedEnd}
    </Flex>
  );
};

export default FlexContainer;
