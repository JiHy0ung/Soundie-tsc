import { Box, Grid, Typography } from "@mui/material";
import type { Artist } from "../../../models/artist";
import { alpha, styled } from "@mui/material/styles";
import { MicVocal } from "lucide-react";

interface ArtistsProps {
  artists: Artist[];
}

const SearchArtistsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "48px",
  [theme.breakpoints.down("xl")]: {
    paddingTop: "24px",
  },
}));

const SearchArtistsResultArea = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: `${alpha(theme.palette.background.default, 0.5)}`,
  },
}));

const SearchArtistsCoverArea = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "165px",
  width: "165px",
});

const SearchArtistsCover = styled("img")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "165px",
  height: "165px",
  borderRadius: "50%",
  boxShadow: "0 0.2rem 0.5rem #00000012",
});

const SearchArtistsNoCoverArea = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "165px",
  width: "165px",
  backgroundColor: `${alpha(theme.palette.background.default, 0.5)}`,
  borderRadius: "50%",
  boxShadow: "0 0.2rem 0.5rem #00000012",
}));

const SearchArtistsNoCover = styled("svg")({
  height: "64px",
  width: "64px",
  fill: "#ffffff7c",
});

const SearchArtistTextInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "flex-start",
  gap: "4px",
});

const SearchArtistName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&:hover": {
    textDecoration: "underline",
  },
}));

const Artists = ({ artists }: ArtistsProps) => {
  return (
    <SearchArtistsContainer>
      <Typography variant="h1" marginBottom={"8px"}>
        아티스트
      </Typography>
      <Grid
        width={"100%"}
        container
        spacing={{ xl: 0, lg: 2, md: 2, sm: 4, xs: 6 }}
      >
        {artists.slice(0, 6).map((artist) => {
          return (
            <Grid size={{ lg: 4, xs: 6, xl: 2 }}>
              <SearchArtistsResultArea>
                {artist.images && artist.images.length > 0 ? (
                  <SearchArtistsCoverArea>
                    <SearchArtistsCover src={artist.images?.[0].url} />
                  </SearchArtistsCoverArea>
                ) : (
                  <SearchArtistsNoCoverArea>
                    <SearchArtistsNoCover viewBox="0 0 24 24">
                      <MicVocal />
                    </SearchArtistsNoCover>
                  </SearchArtistsNoCoverArea>
                )}
                <SearchArtistTextInfo>
                  <SearchArtistName variant="h2" fontWeight={400}>
                    {artist.name}
                  </SearchArtistName>
                  <Typography variant="body1" color="#b3b3b3">
                    아티스트
                  </Typography>
                </SearchArtistTextInfo>
              </SearchArtistsResultArea>
            </Grid>
          );
        })}
      </Grid>
    </SearchArtistsContainer>
  );
};

export default Artists;
