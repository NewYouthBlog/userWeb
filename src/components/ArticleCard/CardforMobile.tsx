import { article } from "@/@types/arctice";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { removeMarkdown } from "@/lib/utils";

interface props {
  data: article;
}

export default function CardforMobile({ data }: props) {
  return (
    <div className=" md:hidden flex justify-center">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="140" image={data.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.title.slice(0, 50)}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {removeMarkdown(data.content).slice(0, 50)}
          </Typography>
        </CardContent>
        {/* <CardActions> */}
        {/*   <Button size="small" color="primary"> */}
        {/**/}
        {/*   </Button> */}
        {/* </CardActions> */}
      </Card>
    </div>
  );
}
