import type { Metadata } from "next";
import {Schibsted_Grotesk , Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sg",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mm",
});

export const metadata: Metadata = {
  title: "Devent | Events platform",
  description: "Your everyday life events kept in order",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "schibstedGrotesk.variable", "martianMono.variable")}
    >
      <body className={`min-h-full antialiased ${schibstedGrotesk.variable} ${martianMono.variable}`}>{children}</body>
    </html>
  );
}
