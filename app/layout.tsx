import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modal/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modal/LoginModal";
import RentModal from "./components/modal/RentModal";
import getCurrentUser from "./actions/getCurrentUser";
import Loading from "./page/loading";
export const metadata: Metadata = {
  title: "Airbnb",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />

          <Navbar currentUser={currentUser} />
        </ClientOnly>

        <div className="pb-20  pt-28">{children}</div>
      </body>
    </html>
  );
}
