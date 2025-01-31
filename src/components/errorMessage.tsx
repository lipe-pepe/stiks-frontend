import { Center, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { MdErrorOutline } from "react-icons/md";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
}: ErrorMessageProps) => {
  return (
    <HStack color="white" gap={2} maxW={"100%"}>
      <Center
        boxSize={[5, null, null, 6]}
        rounded={"full"}
        bgColor={"red.base"}
      >
        <MdErrorOutline size={"110%"} />
      </Center>
      <Text fontSize={["sm", null, null, "md"]} fontFamily={"inter"}>
        {message}
      </Text>
    </HStack>
  );
};

export default ErrorMessage;
