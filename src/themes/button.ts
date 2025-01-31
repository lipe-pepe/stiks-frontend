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

const primary = defineStyle({
  bgColor: "blue.base",
  textColor: "white",
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
  _hover: {
    bgColor: "blue.base",
    textColor: "white",
    transition: "background-color 0.2s ease-in-out", // Adiciona suavidade à animação
  },
});

const danger = defineStyle({
  bgColor: "red.base",
  textColor: "white",
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
  borderWidth: 2,
});

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    variant: "primary",
    size: "md",
  },
  variants: { primary, secondary, danger, game },
  sizes: { xs, sm, md, lg },
});
