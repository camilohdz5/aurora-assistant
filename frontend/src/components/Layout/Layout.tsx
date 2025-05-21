"use client";

import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import StyledComponentsRegistry from "../../lib/StyledComponentsRegistry";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";
import GlobalStyles from "../../styles/GlobalStyles";
import Sidebar from "../Sidebar/Sidebar";
import { StoreProvider } from "@/redux/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
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
            <Sidebar />
            <StoreProvider>{children}</StoreProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
