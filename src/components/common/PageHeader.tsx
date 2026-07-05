import { Box } from "@mui/material";

export default function PageHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        mt: 0,
        pt: 12,
        width: "auto",
        minHeight: "34vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        borderBottom: "1px solid var(--border)",
        background:
          "radial-gradient(circle at 50% 0%, oklch(0.54 0.07 155 / 0.18), transparent 28rem), linear-gradient(90deg, oklch(0.84 0.018 230 / 0.32) 1px, transparent 1px), linear-gradient(180deg, oklch(0.84 0.018 230 / 0.26) 1px, transparent 1px)",
        backgroundSize: "auto, 38px 38px, 38px 38px",
      }}
    >
      <div>{children}</div>
    </Box>
  );
}
