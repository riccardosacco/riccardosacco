"use client";

import { Inter_Tight } from "next/font/google";
import "./globals.css";

const inter_tight = Inter_Tight({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter_tight.className}>{children}</body>
    </html>
  );
}
