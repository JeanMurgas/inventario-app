export const dynamic = "force-dynamic";
import Navbar from "./components/Navbar";
import { getCurrentUser } from "./actions/auth";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Inventory App",
  description: "Inventory management app with authentication, roles and admin panel.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  const user = await getCurrentUser();

  const isDark =
    user?.theme === "DARK";
  return (
    <html
      lang="en"
      className={`
      ${geistSans.variable}
      ${geistMono.variable}
      h-full
      antialiased
      ${isDark ? "dark" : ""}
    `}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground" 
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
