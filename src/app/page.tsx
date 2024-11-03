import AppAppBar from "@/components/AppBar";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <AppAppBar></AppAppBar>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        {/* <MainContent /> */}
      </Container>
      {/* <Footer /> */}
    </>
  );
}
