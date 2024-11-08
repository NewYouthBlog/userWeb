import ArcticleCard from "@/components/ArticleCard/ArcticeCard";
import Footer from "@/components/footer";
import SwiperImg from "@/components/swiper/SwiperImg";
import TagsCard from "@/components/TagsCard/TagsCard";
import { Box, Container, Grid2 } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Main 内容部分,appbar部分在layout文件中 */}
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <SwiperImg></SwiperImg>
        <Container maxWidth={"xl"}>
          <Grid2 container justifyContent={"center"} columns={24}>
            <Grid2 size={17}>
              <ArcticleCard></ArcticleCard>
            </Grid2>
            <Grid2
              size={4}
              offset={0.4}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <TagsCard></TagsCard>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
      {/* Footer 底部部分 */}
      <Box
        component="footer"
        sx={{ py: 2, mt: 8, backgroundColor: "transparent", color: "black" }}
      >
        <Footer></Footer>
      </Box>
    </Box>
  );
}
