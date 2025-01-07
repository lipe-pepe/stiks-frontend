import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Providers } from "../providers";
import { fonts } from "../fonts";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Box, Grid } from "@chakra-ui/react";

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

  const gridTemplateColumns = ["repeat(4, 1fr)"];
  const gridGap = ["1rem"];
  const pagePadding = ["1rem"];

  return (
    <html lang={locale} className={fonts.inter.variable}>
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
                  <Footer />
                </Grid>
              </Box>
            </Box>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
