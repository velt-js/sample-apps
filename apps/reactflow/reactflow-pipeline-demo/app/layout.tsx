import "../styles/globals.css";
import React from "react";

export const metadata = {
  title: "React Flow Boilerplate",
  description: "A minimal React Flow + Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


