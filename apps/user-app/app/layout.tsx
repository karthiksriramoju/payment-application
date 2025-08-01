import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { LayoutWrapper } from "./components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayFlow - Secure Payments Made Simple",
  description: "Experience seamless money transfers, instant payments, and secure transactions with PayFlow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </body>
      </Providers>
    </html>
  );
}
