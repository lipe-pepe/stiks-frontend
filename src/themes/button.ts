import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

// Sizes

const xs = defineStyle({
  fontSize: "xs",
  borderWidth: 2,
});

const sm = defineStyle({
  fontSize: "sm",
  borderWidth: 2,
});

const md = defineStyle({
  fontSize: "md",
  px: "3rem",
  py: "1.5rem",
  borderRadius: 10,
  borderWidth: 3,
});

const lg = defineStyle({
  fontSize: "lg",
  px: "4rem",
  py: "2rem",
  borderRadius: 12,
  borderWidth: 4,
});

// Variants

const primary = defineStyle({
  bgColor: "blue.base",
  fontFamily: "quicksand",
  fontWeight: "bold",
  textColor: "white",
  borderColor: "transparent",
  _hover: {
    bgColor: "blue.light",
    transform: "scale(1.05)", // Cresce 5% no hover
    transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out", // Adiciona suavidade à animação
  },
  _active: {
    bgColor: "blue.dark",
    transition: "background-color 0.2s ease-in-out", // Adiciona suavidade à animação
  },
});

const secondary = defineStyle({
  bgColor: "white",
  textColor: "blue.base",
  fontFamily: "quicksand",
  fontWeight: "bold",
  borderColor: "transparent",
  _hover: {
    bgColor: "blue.base",
    textColor: "white",
    transition: "background-color 0.2s ease-in-out", // Adiciona suavidade à animação
  },
});

const danger = defineStyle({
  bgColor: "red.base",
  textColor: "white",
  fontFamily: "quicksand",
  fontWeight: "bold",
  borderColor: "transparent",
  _hover: {
    bgColor: "red.light",
    transform: "scale(1.05)", // Cresce 5% no hover
    transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out", // Adiciona suavidade à animação
  },
  _active: {
    bgColor: "red.dark",
    transition: "background-color 0.2s ease-in-out", // Adiciona suavidade à animação
  },
});

const game = defineStyle({
  bgColor: "yellow.base",
  color: "black",
  borderColor: "black",
  fontWeight: "bold",
  fontFamily: "quicksand",
  _hover: {
    bgColor: "yellow.light",
    transform: "scale(1.05)", // Cresce 5% no hover
    transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out", // Adiciona suavidade à animação
  },
});

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    variant: "primary",
    size: "md",
  },
  variants: { primary, secondary, danger, game },
  sizes: { xs, sm, md, lg },
});
