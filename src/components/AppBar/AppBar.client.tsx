"use client";
import ArchiveIcon from "@mui/icons-material/Archive";
import HomeIcon from "@mui/icons-material/Home";
import { Button, styled, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter } from "next/navigation";


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: "blur(10px)", // 设置模糊效果
  backgroundColor: "rgba(255, 255, 255, 0.3)", // 设置半透明背景
  boxShadow: "none",
}));

export default function AppBarClient() {
  const theme = useTheme(); // Access global theme
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const handleNavigation = (path: string) => {
    if (pathname !== path) {
      setIsLoading(true);
    }
    router.push(path);
  };

  //WARN:使用后端,最好是写道上一层组件，保证ssr
  const pathMap = [
    { labelText: "主页", icon: <HomeIcon />, routerPath: "/" },
    { labelText: "归档", icon: <ArchiveIcon />, routerPath: "/archive" }, // 假设还有其他图标
    // 可以在这里添加更多的项目
  ];

  return (
    <StyledAppBar position="fixed" color="transparent">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        {pathMap.map((item, index) => (
          <Button
            key={index} // 使用唯一的 key
            size="small"
            aria-label={item.labelText}
            sx={{
              mr: 2,
              color:
                pathname === item.routerPath
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.contrastText,
            }}
            onClick={() => handleNavigation(item.routerPath)}
          >
            <Typography
              component="span"
              className="font-custom flex items-center"
              sx={{
                position: "relative", // 设置为相对定位，用于控制伪元素的位置
                paddingBottom: 1, // 增加一些底部空间
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor:
                    pathname === item.routerPath
                      ? theme.palette.secondary.main
                      : "transparent",
                  transition: "background-color 0.3s ease", // 使用平滑的背景色变化
                },
              }}
            >
              {item.icon}
              {item.labelText}
            </Typography>
          </Button>
        ))}
      </Toolbar>
      <AnimatePresence>
        {isLoading && (
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
              background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>
    </StyledAppBar>
  );
}
