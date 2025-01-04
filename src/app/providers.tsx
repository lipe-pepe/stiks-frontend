"use client";

// This file sets up the providers required by Chakya UI 2 to run a smooth experience
// when using NextJS App Router

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/themes/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
