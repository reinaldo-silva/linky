import { ClientOnly } from "@/components/ClientOnly";
import { Header, HeaderLoading } from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linky!",
  description: "Shorten and manage your URLs easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-zinc-50">
      <body className={`${inter.variable} antialiased px-6`}>
        <Providers>
          <ClientOnly fallback={<HeaderLoading />}>
            <Header />
          </ClientOnly>
          {children}
        </Providers>
      </body>
    </html>
  );
}
