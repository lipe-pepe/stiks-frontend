import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

// Sizes

const xs = defineStyle({
  fontSize: "12px",
});

const sm = defineStyle({
  fontSize: "12px",
});

const md = defineStyle({
  fontSize: "24px",
  fontWeight: 500,
  borderRadius: "12px",
  py: "2rem",
});

// Variants

const primary = defineStyle({ bgColor: "blue.base", textColor: "white" });

const secondary = defineStyle({
  bgColor: "transparent",
  borderColor: "white",
  borderRadius: 4,
  borderWidth: "2px",
  textColor: "white",
  fontWeight: 500,
});

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    variant: "primary",
    size: "md",
  },
  variants: { primary, secondary },
  sizes: { xs, sm, md },
});
