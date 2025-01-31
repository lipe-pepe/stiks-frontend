import { Inter } from "next/font/google";
import { Dongle } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dongle = Dongle({
  subsets: ["latin"],
  variable: "--font-dongle",
  weight: ["300", "400", "700"],
});

export const fonts = {
  inter,
  dongle,
};
