"use client";

import { Providers } from "./providers";
import { fonts } from "./fonts";
import { Box } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>
          <Box
            w="100vw"
            h="100vh"
            bgGradient="linear(to-tl, background.light, background.base, background.dark)" // Fundo gradiente, base do Background
          >
            <Box
              w="100%"
              h="100%"
              backgroundImage="url('/images/bg_pattern.png')"
              backgroundSize="cover" // Ajusta a imagem para cobrir todo o Box
              backgroundPosition="center" // Centraliza a imagem
              backgroundRepeat="no-repeat" // Evita a repetição da imagem
            >
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
