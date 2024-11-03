"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { createTheme, styled, ThemeProvider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArchiveIcon from "@mui/icons-material/Archive";

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

const items = [
  { label: "主页", icon: <HomeIcon /> },
  { label: "归档", icon: <ArchiveIcon /> }, // 假设还有其他图标
  // 可以在这里添加更多的项目
];
export default function ButtonAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <StyledAppBar position="fixed" color="transparent">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          {items.map((item, index) => (
            <IconButton
              key={index} // 使用唯一的 key
              size="small"
              edge="end"
              color="secondary"
              aria-label={item.label}
              sx={{ mr: 2 }}
            >
              <Typography
                component="div"
                className="font-custom flex items-center"
              >
                {item.icon}
                {item.label}
              </Typography>
            </IconButton>
          ))}
        </Toolbar>
      </StyledAppBar>
    </ThemeProvider>
  );
}
