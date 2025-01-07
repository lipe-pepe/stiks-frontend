import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    textColor: "black",
    bgColor: "white",
    _placeholder: {
      textColor: "gray.1",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
