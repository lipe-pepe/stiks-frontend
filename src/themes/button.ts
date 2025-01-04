import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

// Sizes

const xs = defineStyle({
  fontSize: "12px",
});

const sm = defineStyle({
  fontSize: "12px",
});

const md = defineStyle({
  fontSize: "12px",
});

// Variants

const primary = defineStyle({ bgColor: "blue.base", textColor: "white" });

const secondary = defineStyle({
  bgColor: "transparent",
  borderColor: "white",
  borderRadius: 4,
  borderWidth: "2px",
  textColor: "white",
});

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    variant: "primary",
    size: "md",
  },
  variants: { primary, secondary },
  sizes: { xs, sm, md },
});
