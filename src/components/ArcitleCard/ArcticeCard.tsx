import { article } from "@/@types/arctice";
import CardfoPC from "./CardforPC";
import CardforMobile from "./CardforMobile";
import { Box } from "@mui/material";

export default function ArcticCard() {
  //FIX: use database
  const data: article = {
    imgurl: "/2.jpg",
    createdAt: "2024-11-05",
    content:
      "文章包括各种文体的著作、作品，如诗歌、戏剧、小说、科学论文，记叙文、议论文、说明文、应用文等等。 “千古文章未尽才”“文章千古事”“文章憎命达”“板凳要坐十年冷、文章不写一字空”“积句而成章，积章而成篇”“言出为论，下笔成章”等，都是现在所说的文章的意思。",
    title: "文字测试",
  };
  return (
    <>
      <CardfoPC data={data}></CardfoPC>
      <CardforMobile data={data}></CardforMobile>
    </>
  );
}
