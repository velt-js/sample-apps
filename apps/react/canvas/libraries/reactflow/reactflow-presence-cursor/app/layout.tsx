import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";
import { AppUserProvider } from "@/app/userAuth/useAppUser";

export const metadata: Metadata = {
  title: "Velt-Ready Prototype",
  description: "A collaborative document editor prototype",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AppUserProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppUserProvider>
      </body>
    </html>
  );
}
