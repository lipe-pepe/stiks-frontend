import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
}: ErrorMessageProps) => {
  return (
    <HStack color={"red.base"} gap={2} maxW={"100%"}>
      <Flex
        rounded="full"
        borderColor="red.dark"
        borderWidth={1}
        bgColor="red.base"
        justifyContent="center"
        alignItems="center"
        textColor="white"
        minW={"1.25rem"}
        maxH={"1.25rem"}
      >
        !
      </Flex>
      <Text color="white" fontSize={["sm", "sm", "sm", "md"]} mt={1}>
        {message}
      </Text>
    </HStack>
  );
};

export default ErrorMessage;
