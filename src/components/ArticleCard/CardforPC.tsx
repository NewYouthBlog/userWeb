"use client";
import { Box, Grid2, Pagination } from "@mui/material";
import { article } from "@/@types/arctice";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { WobbleCard } from "../ui/wobble-card";
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
      >
        <WobbleCard containerClassName="bg-slate-50">
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
                  src={data.image}
                  className="w-full h-full object-cover rounded-xl"
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
                <h2 className="font-bold">{data.title}</h2>
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
                  {data.content.slice(0, 50)}
                </Box>
              </Grid2>
              <Grid2
                container
                sx={{ width: "100%" }}
                justifyContent={"space-between"}
                columns={12}
                alignItems={"center"}
              >
                <Grid2
                  sx={{
                    marginLeft: {
                      sm: 5,
                      md: 4,
                      lg: 8,
                    },
                  }}
                >
                  {data.tags.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className="px-1 py-0.5 bg-customFg text-white  rounded  transform hover:-translate-y-1 transition duration-400 ml-1 text-sm"
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </Grid2>

                <Grid2 sx={{ color: "gray", fontSize: "0.85rem" }}>
                  <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>
                  {data.createdAt.slice(0, 10)}
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </WobbleCard>
      </motion.div>
    </div>
  );
}
