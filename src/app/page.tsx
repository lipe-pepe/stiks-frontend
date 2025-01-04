"use client";

import { GridItem, Image } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <GridItem colSpan={2} colStart={2}>
        <Image src="/images/logo/mainLogo.svg" alt="Stiks Logo" />
      </GridItem>
    </>
  );
}
