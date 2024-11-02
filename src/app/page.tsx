import Footer from "@/components/footer";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        {/* <MainContent /> */}
      </Container>
      <Footer />
    </>
  );
}
