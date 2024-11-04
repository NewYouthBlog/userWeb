import AppAppBar from "@/components/AppBar";
import Footer from "@/components/footer";
import SwiperImg from "@/components/swiper/SwiperImg";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <AppAppBar></AppAppBar>

      {/* Main 内容部分 */}
      <Box sx={{ flexGrow: 1, mt: 8 }} className="flex flex-col h-screen">
        <SwiperImg></SwiperImg>
        <h1> statrsat</h1>
      </Box>
      {/* Footer 底部部分 */}
      <Box
        component="footer"
        sx={{ py: 2, backgroundColor: "transparent", color: "black" }}
      >
        <Footer></Footer>
      </Box>
    </Box>
  );
}
