import { extendTheme } from "@chakra-ui/react";

// This file customizes Chakra UI theme with the project's color palette, breakpoints and more.

const breakpoints = {
  xs: "360px",
  sm: "720px",
  md: "1280px",
  lg: "1440px",
  xl: "1920px",
};

const colors = {
  background: {
    light: "#f0b53a",
    base: "#ef7b39",
    dark: "#f05c3a",
  },
};

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-rubik)",
    body: "var(--font-rubik)",
  },
  breakpoints,
  colors,
});
