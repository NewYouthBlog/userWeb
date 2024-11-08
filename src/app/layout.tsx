import type { Metadata } from "next";
import "./globals.css";
import AppBarClient from "@/components/AppBar/AppBar.client";

export const metadata: Metadata = {
  title: "李星河的个人博客",
  description: "个人项目",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh_CN">
      <body>
        <AppBarClient></AppBarClient>
        {children}
      </body>
    </html>
  );
}
