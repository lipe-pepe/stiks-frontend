import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

// Sizes

const xs = defineStyle({
  fontSize: "xs",
});

const sm = defineStyle({
  fontSize: "sm",
});

const md = defineStyle({
  fontSize: "md",
  px: "3rem",
  py: "1.5rem",
  borderRadius: 10,
});

const lg = defineStyle({
  fontSize: "lg",
  px: "4rem",
  py: "2rem",
  borderRadius: 12,
});

// Variants

const primary = defineStyle({ bgColor: "blue.base", textColor: "white" });

const secondary = defineStyle({ bgColor: "white", textColor: "blue.base" });

const number = defineStyle({
  bgColor: "gray.1",
  textColor: "black",
  rounded: "full",
});

const game = defineStyle({
  bgColor: "yellow.base",
  color: "black",
  borderColor: "black",
  borderWidth: 2,
  textTransform: "uppercase",
});

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    variant: "primary",
    size: "md",
  },
  variants: { primary, secondary, number, game },
  sizes: { xs, sm, md, lg },
});
