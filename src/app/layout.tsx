import type { Metadata } from "next";
import { Poppins, Barlow } from "next/font/google";
import "./globals.css";
import AppLayout from "../components/Shared/AppLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['600'], // SemiBold
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ['400'], // Regular
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rolan Examination Master",
  description: "Rolan Examination Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${barlow.variable} antialiased`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
