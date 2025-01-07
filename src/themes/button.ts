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
});

const lg = defineStyle({
  fontSize: "lg",
  px: "4rem",
  py: "2rem",
  borderRadius: 12,
});

// Variants

const primary = defineStyle({ bgColor: "blue.base", textColor: "white" });

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    variant: "primary",
    size: "md",
  },
  variants: { primary },
  sizes: { xs, sm, md, lg },
});
