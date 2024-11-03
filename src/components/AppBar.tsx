"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { createTheme, styled, ThemeProvider } from "@mui/material";
import { HomeIcon } from "@radix-ui/react-icons";

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
      <StyledAppBar position="static" color="transparent">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="small"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <Typography component="div" className=" font-custom">
              <HomeIcon />
              主页
            </Typography>
          </IconButton>
        </Toolbar>
      </StyledAppBar>
    </ThemeProvider>
  );
}
