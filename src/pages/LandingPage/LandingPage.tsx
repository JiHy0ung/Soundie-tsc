import { styled } from "@mui/material/styles";
import NewReleases from "./components/NewReleases";
import TopArtists from "./components/TopArtists";
import TopHitsAlbums from "./components/TopHitsAlbums";
import { Box } from "@mui/material";

const LandingContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "1rem",
  overflowY: "auto",
  overflowX: "hidden",
  padding: "1rem",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },

  [theme.breakpoints.down("lg")]: {
    backgroundColor: "transparent",
    padding: "0rem",
  },
}));

const ContentWrapper = styled(Box)({
  marginTop: "1rem",
});

const LandingPage = () => {
  return (
    <LandingContainer>
      <ContentWrapper>
        <NewReleases />
      </ContentWrapper>
      <ContentWrapper>
        <TopArtists />
      </ContentWrapper>
      <ContentWrapper>
        <TopHitsAlbums />
      </ContentWrapper>
    </LandingContainer>
  );
};
export default LandingPage;
