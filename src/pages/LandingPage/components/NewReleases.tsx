import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";

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

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();

  if (isLoading) {
    return <div>...loading</div>;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  console.log("ddd", data);
  return (
    <NewReleasesContainer>
      <TitleText>New Releases Albums</TitleText>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={4} sx={{ paddingInline: "1rem" }}>
          {data.albums.items.map((album) => (
            <Grid
              size={{ xs: 6, md: 4, lg: 2 }}
              key={album.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                image={album.images[0].url ?? ""}
                name={album.name}
                artist={album.artists[0].name ?? ""}
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

export default NewReleases;
