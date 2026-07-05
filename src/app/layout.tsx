import type { Metadata } from "next";
import "./globals.css";
import AppBarClient from "@/components/AppBar/AppBar.client";
import Footer from "@/components/footer";
import { Box } from "@mui/material";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["博客", SITE_AUTHOR, "前端开发", "全栈开发", "技术分享", "编程", SITE_NAME],
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
    <html lang="zh-CN">
      <body>
        <ThemeRegistry>
          <AppBarClient />
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
          <Box
            component="footer"
            sx={{
              py: 2,
              mt: 8,
              backgroundColor: "transparent",
              color: "var(--ink)",
            }}
          >
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
