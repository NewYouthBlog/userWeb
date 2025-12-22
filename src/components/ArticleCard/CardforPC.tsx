"use client";
import { Box, Grid2 } from "@mui/material";
import { article } from "@/@types/arctice";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { WobbleCard } from "../ui/wobble-card";
import { removeMarkdown } from "@/lib/utils";
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
        <WobbleCard containerClassName="bg-white/80 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl hover:shadow-[0_20px_50px_rgba(99,102,241,0.3)] transition-shadow duration-500">
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
                  src={data.HeadImg ? data.HeadImg : data.image}
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
                <h2 className="font-bold text-slate-800 text-lg tracking-wide transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 cursor-pointer">
                  {data.title}
                </h2>
              </Grid2>
              <Grid2
                size={{ xs: 4, sm: 3, md: 3 }}
                offset={{ xs: 0, sm: 0.5, md: 0.5 }}
              >
                <Box
                  component={"p"}
                  sx={{
                    color: "rgb(100 116 139)", // slate-500 equivalent
                    minHeight: "12vh",
                    maxHeight: "14vh",
                    overflow: "hidden",
                  }}
                >
                  {removeMarkdown(data.content).slice(0, 50)}
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
                      <span
                        key={index}
                        className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full shadow-sm hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transform hover:-translate-y-0.5 transition-all duration-300 ml-2 text-xs font-semibold tracking-wide"
                      >
                        {item.name}
                      </span>
                    );
                  })}
                </Grid2>

                <Grid2 sx={{ color: "rgb(148 163 184)", fontSize: "0.8rem", display: 'flex', alignItems: 'center', gap: 0.5 }}>
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
