import { extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "./button";
import { inputTheme } from "./input";

const breakpoints = {
  base: "0px",
  sm: "480px",
  md: "720px",
  lg: "1280px",
  xl: "1440px",
  "2xl": "1920px",
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
  gray: {
    1: "#EAEAEA",
    2: "#D9D9D9",
  },
  green: {
    lightest: "#D1F598",
    light: "#BBEC7C",
    base: "#9CE053",
    dark: "#7AC03C",
    darkest: "#5CA129",
  },
  red: {
    lightest: "#FFA887",
    light: "#FF8669",
    base: "#FF4F38",
    dark: "#DB2F28",
    darkest: "#B71C23",
  },
  yellow: {
    lightest: "#FFEC67",
    light: "#FFE541",
    base: "#FFD902",
    dark: "#DBB701",
    darkest: "#B79601",
  },
};

const fontSizes = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  "2xl": "28px",
};

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-quicksand)",
    body: "var(--font-inter)",
    inter: "var(--font-inter)",
    quicksand: "var(--font-quicksand)",
  },
  fontSizes,
  breakpoints,
  colors,
  components: {
    Button: buttonTheme,
    Input: inputTheme,
  },
});
