"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { tags } from "@/@types/tag";
import TagsButton from "../ui/tags-button";
import { Box } from "@mui/material";
interface props {
  data: tags[];
}

export function TagsCard_client({ data }: props) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-0.8xl font-bold text-neutral-600 dark:text-white w-full flex justify-center"
        >
          所有标签
          {/* 分割线 */}
        </CardItem>

        <div className="border-t border-gray-300 my-4 flex"></div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {data.map((item, index) => {
            return (
              <div className="flex flex-wrap gap-1 p-2 " key={index}>
                <TagsButton tagsName={item.name}></TagsButton>
              </div>
            );
          })}
        </Box>
      </CardBody>
    </CardContainer>
  );
}
