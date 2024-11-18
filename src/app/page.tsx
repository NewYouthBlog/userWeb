import ArtcileCard from "@/components/ArticleCard/ArticleCard";
import Affix from "@/components/common/Affix";
import SwiperImg from "@/components/swiper/SwiperImg";
import TagsCard from "@/components/TagsCard/TagsCard";
import { Box, Container, Grid2 } from "@mui/material";
//
// xs (extra-small): 小于 600px 手机端
// sm (small): 从 600px 到 959.99px 手机端
// md (medium): 从 960px 到 1279.99px 平板
// lg (large): 从 1280px 到 1919.99px 笔记本
// xl (extra-large): 大于或等于 1920px 2k
//
export default function Home() {
  return (
    <>
      {/* Main 内容部分,appbar部分在layout文件中 */}
      <Box sx={{ flexGrow: 1, mt: 8 }}>
        <SwiperImg></SwiperImg>
        <Container maxWidth={"xl"}>
          <Grid2 container justifyContent={"center"} columns={24}>
            <Grid2 size={{ sm: 20, md: 14, lg: 15 }}>
              <ArtcileCard urlPrefix="articles"></ArtcileCard>
            </Grid2>
            <Grid2
              size={{ sm: 0, md: 6, lg: 6 }}
              offset={0.4}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <TagsCard></TagsCard>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </>
  );
}
