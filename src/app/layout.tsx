import type { Metadata } from "next";
import "./globals.css";
import AppBarClient from "@/components/AppBar/AppBar.client";
import Footer from "@/components/footer";
import { Box } from "@mui/material";

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
        <Box
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
      </body>
    </html>
  );
}
