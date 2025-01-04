"use client";

import { Providers } from "./providers";
import { fonts } from "./fonts";
import { Box, Grid } from "@chakra-ui/react";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gridTemplateColumns = ["repeat(4, 1fr)"];
  const gridGap = ["1rem"];
  const pagePadding = ["1rem"];
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
              px={pagePadding}
            >
              <Header />
              <Grid
                gridTemplateColumns={gridTemplateColumns}
                gap={gridGap}
                h={"100vh"}
              >
                {children}
              </Grid>
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
