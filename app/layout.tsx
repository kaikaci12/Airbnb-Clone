import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Navbar />
    </html>
  );
}
