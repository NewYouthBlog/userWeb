import type { Metadata } from "next";
import "./globals.css";
import AppBarClient from "@/components/AppBar/AppBar.client";
import Footer from "@/components/footer";
import { Box } from "@mui/material";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export const metadata: Metadata = {
  title: {
    default: "新青年talks",
    template: "%s | 新青年talks",
  },
  description: "分享编程技术、生活感悟和个人项目的展示平台",
  keywords: ["博客", "李星河", "前端开发", "全栈开发", "技术分享", "编程", "新青年talks"],
  authors: [{ name: "李星河" }],
  creator: "李星河",
  publisher: "李星河",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    title: "新青年talks",
    description: "分享编程技术、生活感悟和个人项目的展示平台",
    url: "/",
    siteName: "新青年talks",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "新青年talks",
    description: "分享编程技术、生活感悟和个人项目的展示平台",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh_CN">
      <body>
        <ThemeRegistry>
          <AppBarClient></AppBarClient>
          <Box
            component="main"
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "85vh",
            }}
          >
            {children}
          </Box>
          {/* Footer 底部部分 */}
          <Box
            component="footer"
            sx={{
              py: 2,
              mt: 8,
              backgroundColor: "transparent",
              color: "black",
            }}
          >
            <Footer></Footer>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
