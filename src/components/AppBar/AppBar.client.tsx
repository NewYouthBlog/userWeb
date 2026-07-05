"use client";
import ArchiveIcon from "@mui/icons-material/Archive";
import HomeIcon from "@mui/icons-material/Home";
import { Button, styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import React, { useTransition } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "oklch(0.985 0.007 230 / 0.88)",
  backdropFilter: "blur(14px)",
  borderBottom: "1px solid oklch(0.84 0.025 225 / 0.82)",
  boxShadow: "none",
}));

export default function AppBarClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (path: string) => {
    if (pathname === path) {
      return;
    }

    startTransition(() => {
      router.push(path);
    });
  };

  const pathMap = [
    { labelText: "主页", icon: <HomeIcon />, routerPath: "/" },
    { labelText: "归档", icon: <ArchiveIcon />, routerPath: "/archive" }, // 假设还有其他图标
    // 可以在这里添加更多的项目
  ];

  return (
    <StyledAppBar position="fixed" color="transparent">
      <Toolbar sx={{ minHeight: 68, px: { xs: 2, md: 5 } }}>
        <Box
          onClick={() => handleNavigation("/")}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1.15,
            mr: 3,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: 42, md: 48 },
              height: { xs: 42, md: 48 },
              flexShrink: 0,
              overflow: "hidden",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              backgroundColor: "var(--surface-raised)",
              boxShadow: "0 10px 26px oklch(0.28 0.035 245 / 0.08)",
            }}
          >
            <Image
              src="/logo.png"
              alt="新青年talks logo"
              fill
              sizes="48px"
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <Typography
              component="span"
              sx={{
                color: "var(--ink)",
                fontSize: { xs: 17, md: 19 },
                fontWeight: 850,
                letterSpacing: 0,
              }}
            >
              新青年talks
            </Typography>
            <Typography
              component="span"
              sx={{
                mt: 0.6,
                color: "var(--muted)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Digital Shelter
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        {pathMap.map((item) => (
          <Button
            key={item.routerPath}
            size="small"
            aria-label={item.labelText}
            sx={{
              mr: { xs: 0.5, md: 1 },
              px: { xs: 1, md: 1.4 },
              minWidth: 0,
              borderRadius: 999,
              color:
                pathname === item.routerPath
                  ? "var(--ink)"
                  : "var(--muted)",
              backgroundColor:
                pathname === item.routerPath
                  ? "oklch(0.54 0.07 155 / 0.11)"
                  : "transparent",
              border:
                pathname === item.routerPath
                  ? "1px solid oklch(0.54 0.07 155 / 0.28)"
                  : "1px solid transparent",
            }}
            onClick={() => handleNavigation(item.routerPath)}
          >
            <Typography
              component="span"
              className="font-custom flex items-center"
              sx={{
                gap: 0.5,
                fontSize: { xs: 13, md: 14 },
                fontWeight: 750,
              }}
            >
              {item.icon}
              {item.labelText}
            </Typography>
          </Button>
        ))}
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
              height: "3px",
              background: "linear-gradient(90deg, var(--accent), var(--shelter))",
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>
    </StyledAppBar>
  );
}
