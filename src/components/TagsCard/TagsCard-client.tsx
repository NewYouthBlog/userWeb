"use client";

import React from "react";
import { Tag } from "@/@types/tag";
import TagsButton from "../ui/tags-button";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Affix from "../common/Affix";

interface TagsCardClientProps {
  data: Tag[];
}

export function TagsCard_client({ data }: TagsCardClientProps) {
  return (
    <Affix offsetTop={92}>
      <Box
        component="aside"
        sx={{
          p: 3,
          border: "1px solid var(--border)",
          borderRadius: "16px",
          backgroundColor: "oklch(0.995 0.005 230 / 0.78)",
          boxShadow: "0 18px 44px oklch(0.28 0.035 245 / 0.055)",
        }}
      >
        <Typography
          component="h2"
          sx={{
            color: "var(--ink)",
            fontSize: 18,
            fontWeight: 850,
          }}
        >
          热门主题
        </Typography>
        <Typography sx={{ mt: 1, color: "var(--muted)", lineHeight: 1.7, fontSize: 14 }}>
          用标签给文章建立坐标，找到你今天需要的补给。
        </Typography>

        <Box
          sx={{
            mt: 2.4,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {data.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/tags/${encodeURIComponent(item.name)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TagsButton tagsName={item.name} />
              </Link>
            );
          })}
        </Box>
      </Box>
    </Affix>
  );
}
