"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header";
import { SessionProvider } from 'next-auth/react';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params: { session, ...params},
}) {
  return (
    <html>
      <body className={inter.className}>
        <SessionProvider session={session?.session}>
          <Header  />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
