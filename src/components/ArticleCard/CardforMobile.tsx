import { Article } from "@/@types/article";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { removeMarkdown } from "@/lib/utils";

interface CardForMobileProps {
  data: Article;
}

export default function CardForMobile({ data }: CardForMobileProps) {
  return (
    <div className=" md:hidden flex justify-center">
      <Card
        sx={{
          width: "100%",
          borderRadius: "14px",
          border: "1px solid var(--border)",
          boxShadow: "0 16px 38px oklch(0.28 0.035 245 / 0.07)",
          backgroundColor: "oklch(0.995 0.005 230 / 0.9)",
        }}
      >
        <CardMedia
          component="img"
          height="176"
          image={data.image}
          alt={data.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 800, color: "var(--ink)" }}>
            {data.title.slice(0, 50)}
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--muted)", lineHeight: 1.7 }}>
            {removeMarkdown(data.content).slice(0, 78) + "..."}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
