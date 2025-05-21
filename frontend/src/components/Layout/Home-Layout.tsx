"use client";

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "../../lib/StyledComponentsRegistry";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";
import GlobalStyles from "../../styles/GlobalStyles";
import Navbar from "../Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Navbar />
           {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
