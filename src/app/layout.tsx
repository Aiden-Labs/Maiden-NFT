import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aiden Labs NFT Drop",
  description: "NFT Drop powered by Aiden Labs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <Providers cookie={(await headers()).get("cookie") || ""}>
          <Navbar />
          {children}
        </Providers>
        <footer className="text-center text-sm text-muted-foreground py-8 flex justify-center items-center gap-1">
          Powered by{" "}
          <Link href="https://liteflow.com">
            <Image
              src="/liteflow.svg"
              alt="Liteflow Logo"
              width={96}
              height={24}
            />
          </Link>
        </footer>
      </body>
    </html>
  );
}
