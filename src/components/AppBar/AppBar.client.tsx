"use client";

import ArchiveIcon from "@mui/icons-material/Archive";
import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";

const routes = [
  { label: "主页", icon: <HomeIcon sx={{ fontSize: 16 }} />, path: "/" },
  { label: "归档", icon: <ArchiveIcon sx={{ fontSize: 16 }} />, path: "/archive" },
];

export default function AppBarClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const navigate = (path: string) => {
    if (pathname === path) return;
    startTransition(() => router.push(path));
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "var(--canvas)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 52, md: 56 },
          px: { xs: "1rem", md: "clamp(1rem, 4vw, 3rem)" },
          gap: 2,
        }}
        className="page-shell"
      >
        <Box
          component="button"
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mr: 1,
            p: 0,
            border: 0,
            background: "transparent",
            cursor: "pointer",
          }}
          aria-label="回到主页"
        >
          <Box
            sx={{
              position: "relative",
              width: 28,
              height: 28,
              flexShrink: 0,
              overflow: "hidden",
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <Image
              src="/logo.png"
              alt=""
              fill
              sizes="28px"
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
          <Typography
            component="span"
            sx={{
              color: "var(--ink)",
              fontSize: { xs: 15, md: 16 },
              fontWeight: 800,
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            新青年talks
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          component="nav"
          aria-label="主导航"
          sx={{ display: "flex", alignItems: "stretch", gap: { xs: 0.25, md: 0.5 } }}
        >
          {routes.map((route) => {
            const active = pathname === route.path;
            return (
              <Box
                key={route.path}
                component="button"
                onClick={() => navigate(route.path)}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: { xs: 0.9, md: 1.1 },
                  py: 0.5,
                  minHeight: 36,
                  border: 0,
                  borderBottom: "2px solid",
                  borderRadius: 0,
                  borderColor: active ? "var(--ink)" : "transparent",
                  backgroundColor: "transparent",
                  color: active ? "var(--ink)" : "var(--muted)",
                  fontSize: { xs: 13, md: 14 },
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "color 160ms var(--ease-out), border-color 160ms var(--ease-out)",
                  "&:hover": {
                    color: "var(--ink)",
                  },
                }}
                aria-current={active ? "page" : undefined}
              >
                {route.icon}
                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                  {route.label}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Toolbar>

      <AnimatePresence>
        {isPending && (
          <motion.div
            initial={{ width: "0%", opacity: 1 }}
            animate={{ width: "80%", opacity: 1 }}
            exit={{ width: "100%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "2px",
              background: "var(--accent)",
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>
    </AppBar>
  );
}
