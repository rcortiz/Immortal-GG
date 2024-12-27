import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import Layout from "./components/layout/Layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-[family-name:var(--font-inter)] antialiased`}
      >
        <ApolloWrapper>
          <Layout>{children}</Layout>
        </ApolloWrapper>
      </body>
    </html>
  );
}
