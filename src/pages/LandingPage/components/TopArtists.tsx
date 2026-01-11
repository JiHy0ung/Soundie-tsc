import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useGetSeveralArtists from "../../../hooks/useGetSeveralArtists";
import ArtistCard from "../../../common/components/ArtistCard";

const NewReleasesContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  gap: "1.625rem",
  overflow: "hidden",
});

const TitleText = styled(Typography)(({ theme }) => ({
  padding: "0 1rem",
  fontFamily: theme.typography.fontFamily,
  fontSize: "1.625rem",
  fontWeight: 700,
}));

const TopArtists = () => {
  const { data } = useGetSeveralArtists();

  console.log("aa", data);

  return (
    <NewReleasesContainer>
      <TitleText>Top Hits Albums</TitleText>
      {data && data.artists.length > 0 ? (
        <Grid container spacing={4} sx={{ paddingInline: "1rem" }}>
          {data.artists.map((artist) => (
            <Grid
              size={{ xs: 6, md: 4, lg: 2 }}
              key={artist.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArtistCard
                image={artist?.images?.[0]?.url ?? ""}
                name={artist.name ?? ""}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>no data</Typography>
      )}
    </NewReleasesContainer>
  );
};

export default TopArtists;
