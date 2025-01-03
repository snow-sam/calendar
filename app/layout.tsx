import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'

import "./globals.css";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Calendar",
  description: "Generated by SamSnow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-mono ${poppins.className} dark antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
