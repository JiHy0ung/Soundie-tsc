import type { Track } from "../../../models/track";
import { Box, Grid, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

interface TracksProps {
  tracks: Track[];
}

const SearchTrackContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "48px",
  [theme.breakpoints.down("xl")]: {
    paddingTop: "24px",
  },
}));

const SearchTrackTopResultArea = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "20px",
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  transition: "all 0.3s ease",
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    backgroundColor: `${alpha(theme.palette.background.default, 0.5)}`,
  },
  [theme.breakpoints.down("xl")]: {
    flexDirection: "row",
  },
}));

const SearchTrackTopResultTrackCover = styled("img")({
  display: "flex",
  width: "92px",
  height: "92px",
  borderRadius: "6px",
});

const SearchTrackTopResultTextInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.down("xl")]: {
    justifyContent: "flex-start",
  },
}));

const SearchTrackTrackResultContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
});

const SearchTrackTrackResultArea = styled(Box)({
  height: "56px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingInline: "8px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#ffffff1a",
    "& svg": {
      opacity: "1",
    },
  },
});

const SearchTrackTrackResultTrackArea = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
});

const SearchTrackTrackCover = styled("img")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  borderRadius: "4px",
});

const SearchTrackTrackTextInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const SearchTrackTrackTitle = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.text.primary,
}));

const SearchTrackTrackArtist = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.text.secondary,
}));

const Tracks = ({ tracks }: TracksProps) => {
  return (
    <SearchTrackContainer>
      <Grid width={"100%"} container spacing={2}>
        <Grid size={{ xl: 4, lg: 12, xs: 12 }}>
          <Typography variant="h1" marginBottom={"8px"}>
            상위 결과
          </Typography>
          <SearchTrackTopResultArea>
            <SearchTrackTopResultTrackCover
              src={tracks[0].album?.images[0].url}
              alt={tracks[0].name}
            />
            <SearchTrackTopResultTextInfo>
              <Typography fontSize={"32px"} fontWeight={700}>
                {tracks[0].name}
              </Typography>
              <Typography>Track • {tracks[0].artists?.[0].name}</Typography>
            </SearchTrackTopResultTextInfo>
          </SearchTrackTopResultArea>
        </Grid>
        <Grid size={{ xs: 12, xl: 8 }}>
          <Typography
            variant="h1"
            marginBottom={"8px"}
            sx={{ paddingInline: { xl: "16px", lg: "0px" } }}
          >
            곡
          </Typography>
          <SearchTrackTrackResultContainer>
            {tracks.slice(0, 4).map((track) => {
              return (
                <SearchTrackTrackResultArea>
                  <SearchTrackTrackResultTrackArea>
                    <SearchTrackTrackCover
                      src={track.album?.images[0].url}
                      alt={track.name}
                    />
                    <SearchTrackTrackTextInfo>
                      <SearchTrackTrackTitle variant="h2" fontWeight={400}>
                        {track.name}
                      </SearchTrackTrackTitle>
                      <SearchTrackTrackArtist variant="body1" color="#b3b3b3">
                        {track.artists?.map((artist) => artist.name).join(", ")}
                      </SearchTrackTrackArtist>
                    </SearchTrackTrackTextInfo>
                  </SearchTrackTrackResultTrackArea>
                </SearchTrackTrackResultArea>
              );
            })}
          </SearchTrackTrackResultContainer>
        </Grid>
      </Grid>
    </SearchTrackContainer>
  );
};

export default Tracks;
