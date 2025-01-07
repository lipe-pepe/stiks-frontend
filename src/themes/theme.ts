import { extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "./button";

// This file customizes Chakra UI theme with the project's color palette, breakpoints and more.

const breakpoints = {
  xs: "360px",
  sm: "720px",
  md: "1280px",
  lg: "1440px",
  xl: "1920px",
};

const colors = {
  base: {
    lightest: "#FABF87",
    light: "#F5A469",
    base: "#EF7B39",
    dark: "#CD5A29",
    darkest: "#AC3E1C",
    transparent: "rgba(172, 62, 28, 0.2)",
  },
  background: {
    light: "#f0b53a",
    base: "#ef7b39",
    dark: "#f05c3a",
  },
  blue: {
    lightest: "#69C7FC",
    light: "#43AEFA",
    base: "#0787F7",
    dark: "#0568D4",
    darkest: "#034EB1",
  },
};

const fontSizes = {
  sm: "12px",
  md: "16px",
};

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-inter)",
    body: "var(--font-inter)",
  },
  fontSizes,
  breakpoints,
  colors,
  components: {
    Button: buttonTheme,
  },
});
