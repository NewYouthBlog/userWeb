"use client";

import { Box, Grid2 } from "@mui/material";
import { Article } from "@/@types/article";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { removeMarkdown } from "@/lib/utils";

interface CardForPCProps {
  data: Article;
}

export default function CardForPC({ data }: CardForPCProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "100px 0px",
  });

  return (
    <div className="hidden md:block ">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 18 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 18,
        }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <Box
          sx={{
            p: { md: 2.2, lg: 2.6 },
            border: "1px solid var(--border)",
            borderRadius: "16px",
            backgroundColor: "oklch(0.995 0.005 230 / 0.82)",
            boxShadow: "0 18px 44px oklch(0.28 0.035 245 / 0.055)",
            transition: "transform 180ms ease-out, border-color 180ms ease-out, box-shadow 180ms ease-out",
            "&:hover": {
              transform: "translateY(-3px)",
              borderColor: "oklch(0.45 0.08 235 / 0.45)",
              boxShadow: "0 24px 60px oklch(0.28 0.035 245 / 0.09)",
            },
          }}
        >
          <Grid2
            container
            columns={12}
            alignItems={"center"}
            spacing={2.4}
          >
            <Grid2 size={{ xs: 0, sm: 3, md: 3.2 }}>
              <Box
                sx={{
                  aspectRatio: "1.18",
                  overflow: "hidden",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.HeadImg ? data.HeadImg : data.image}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              </Box>
            </Grid2>
            <Grid2
              container
              size={8.8}
              spacing={1.2}
              direction={"column"}
              alignItems={"start"}
              justifyContent={"center"}
              columns={4}
            >
              <Grid2 size={3} offset={{ xs: 0, sm: 0.5, md: 0.5 }}>
                <h2 className="text-[1.35rem] font-extrabold leading-snug text-[var(--ink)] transition-colors duration-200 hover:text-[var(--accent)]">
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
                    color: "var(--muted)",
                    minHeight: "auto",
                    maxHeight: "5.6rem",
                    overflow: "hidden",
                    lineHeight: 1.75,
                    fontSize: "0.96rem",
                  }}
                >
                  {removeMarkdown(data.content).slice(0, 92) + "..."}
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
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.8,
                    marginLeft: { sm: 4, md: 3, lg: 4 },
                  }}
                >
                  {data.tags.map((item) => {
                    return (
                      <span
                        key={item.id}
                        className="shelter-tag"
                      >
                        {item.name}
                      </span>
                    );
                  })}
                </Grid2>

                <Grid2
                  sx={{
                    color: "var(--muted)",
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <DriveFileRenameOutlineIcon />
                  {data.createdAt.slice(0, 10)}
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
      </motion.div>
    </div>
  );
}
