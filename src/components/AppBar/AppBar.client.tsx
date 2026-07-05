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
  { label: "主页", icon: <HomeIcon fontSize="small" />, path: "/" },
  { label: "归档", icon: <ArchiveIcon fontSize="small" />, path: "/archive" },
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
        backgroundColor: "oklch(0.985 0.007 230 / 0.92)",
        borderBottom: "1px solid oklch(0.84 0.025 225 / 0.85)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 60, md: 68 },
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
            gap: 1.1,
            mr: 2,
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
              width: 38,
              height: 38,
              flexShrink: 0,
              overflow: "hidden",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              backgroundColor: "var(--surface-raised)",
            }}
          >
            <Image
              src="/logo.png"
              alt=""
              fill
              sizes="38px"
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", lineHeight: 1.1 }}>
            <Typography
              component="span"
              sx={{
                color: "var(--ink)",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: 0,
              }}
            >
              新青年talks
            </Typography>
            <Typography
              component="span"
              sx={{
                mt: 0.3,
                color: "var(--muted)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Digital Shelter
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box component="nav" aria-label="主导航" sx={{ display: "flex", gap: { xs: 0.5, md: 1 } }}>
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
                  px: { xs: 1, md: 1.25 },
                  py: 0.6,
                  minHeight: 36,
                  border: "1px solid",
                  borderColor: active ? "oklch(0.54 0.07 155 / 0.32)" : "transparent",
                  borderRadius: 999,
                  backgroundColor: active ? "var(--shelter-soft)" : "transparent",
                  color: active ? "var(--ink)" : "var(--muted)",
                  fontSize: { xs: 13, md: 14 },
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "color 160ms ease-out, background-color 160ms ease-out, border-color 160ms ease-out",
                  "&:hover": {
                    color: "var(--ink)",
                    backgroundColor: active ? "var(--shelter-soft)" : "var(--surface)",
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
              top: 0,
              left: 0,
              height: "2px",
              background: "linear-gradient(90deg, var(--accent), var(--shelter))",
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>
    </AppBar>
  );
}
