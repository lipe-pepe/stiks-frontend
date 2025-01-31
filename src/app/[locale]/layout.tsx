import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Providers } from "../providers";
import { fonts } from "../fonts";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { gridGap, gridTemplateColumns } from "@/themes/gridConfig";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Await params before using its properties
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const pagePadding = ["16px", "80px", "120px", "160px", "240px"];

  return (
    <html
      lang={locale}
      className={`${fonts.quicksand.variable} ${fonts.inter.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Box
              w="100vw"
              h="100vh"
              position="fixed" // Fixa o background
              zIndex="-1" // Coloca o fundo atrás do conteúdo
              bgGradient="linear(to-tl, background.light, background.base, background.dark)" // Fundo gradiente, base do Background
            >
              <Flex
                w="100%"
                h="100%"
                minHeight="100vh"
                backgroundImage="url('/images/bg_pattern.png')"
                backgroundSize="cover" // Ajusta a imagem para cobrir todo o Box
                backgroundPosition="center" // Centraliza a imagem
                backgroundRepeat="no-repeat" // Evita a repetição da imagem
                px={pagePadding}
                flexDir="column"
                fontFamily={"quicksand"}
              >
                <Header />
                <Flex
                  flexDir="column"
                  justifyContent="center"
                  flex="1" // Faz o flex ocupar o espaço entre o Header e o Footer
                >
                  <Grid
                    // bgColor={"teal"} // Usado para debug
                    gridTemplateColumns={gridTemplateColumns}
                    gap={gridGap}
                  >
                    {children}
                  </Grid>
                </Flex>
                <Footer />
              </Flex>
            </Box>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
