"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createTheme, styled, ThemeProvider } from "@mui/material";
import { FileArchiveIcon } from "lucide-react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d9e2e7",
    },
    secondary: {
      main: "#dd856d",
    },
  },
});
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: "blur(10px)", // 设置模糊效果
  backgroundColor: "rgba(255, 255, 255, 0.3)", // 设置半透明背景
  boxShadow: "none",
}));

export default function ButtonAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Typography component="div" className="flex items-center">
                <FileArchiveIcon fontSize="small" />
                文档
              </Typography>
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="secondary">Login</Button>
          </Toolbar>
        </StyledAppBar>
      </Box>
    </ThemeProvider>
  );
}
