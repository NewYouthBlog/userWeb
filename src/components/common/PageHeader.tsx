import { Box } from "@mui/material";

export default function PageHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        mt: 8,
        width: "auto",
        height: "40vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // position: "relative",
        backgroundImage: "url(/3.jpg)",
        backgroundPosition: "0% 13%",
        backgroundSize: "cover",
      }}
    >
      <div>{children}</div>
    </Box>
  );
}
