"use client";

import { Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [runningTime, setRunningTime] = useState("");

  useEffect(() => {
    // 设置建站时间，例如：2024-01-01 00:00:00
    const startDate = new Date("2025-12-01T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setRunningTime(`${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="body1" align="center">
          © 新青年talks {currentYear}
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center">
          在数字荒原里，已守住这处庇护所 {runningTime}
        </Typography>
      </Box>
    </Container>
  );
}
