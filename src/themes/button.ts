import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

// Sizes

const xs = defineStyle({
  fontSize: "12px",
  px: "0.5rem",
  py: "0.25rem",
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

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    variant: "primary",
    size: "md",
  },
  variants: { primary },
  sizes: { xs, sm, md },
});
