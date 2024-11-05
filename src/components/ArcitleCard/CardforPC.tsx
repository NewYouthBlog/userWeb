"use client";
import { Box, Grid2 } from "@mui/material";
import { MagicCard } from "../ui/magic-card";
import { article } from "@/@types/arctice";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
interface props {
  data: article;
}

export default function CardfoPC({ data }: props) {
  const { ref, inView } = useInView({
    triggerOnce: true, // 触发一次
    threshold: 0.3, // 当元素 50% 显示在视口时触发
  });
  return (
    <div className="hidden md:block ">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 100,
        }}
        transition={{ duration: 0.8 }}
        style={{ height: "25vh" }}
      >
        <MagicCard gradientColor="#ecfeff" className="flex items-center">
          <Grid2
            container
            columns={12}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid2 size={{ xs: 0, sm: 3, md: 3 }}>
              <Box
                sx={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  src={data.imgurl}
                  className="w-full h-full object-cover rounded"
                />
              </Box>
            </Grid2>
            <Grid2
              container
              size={8}
              spacing={1}
              direction={"column"}
              alignItems={"start"}
              justifyContent={"center"}
              columns={4}
            >
              <Grid2 size={3} offset={{ xs: 0, sm: 0.5, md: 0.5 }}>
                <h2>{data.title}</h2>
              </Grid2>
              <Grid2
                size={{ xs: 4, sm: 3, md: 3 }}
                offset={{ xs: 0, sm: 0.5, md: 0.5 }}
              >
                <Box
                  component={"p"}
                  sx={{
                    color: "gray",
                    minHeight: "12vh",
                    maxHeight: "14vh",
                    overflow: "hidden",
                  }}
                >
                  {data.content}
                </Box>
              </Grid2>
              <Grid2 offset={{ xs: 2, sm: "auto", md: 3.2 }}>
                <Box sx={{ color: "gray", fontSize: "0.85rem" }}>
                  <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>
                  {data.createdAt}
                </Box>
              </Grid2>
            </Grid2>
          </Grid2>
        </MagicCard>
      </motion.div>
    </div>
  );
}
