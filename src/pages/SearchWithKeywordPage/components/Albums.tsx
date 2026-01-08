import { alpha, styled } from "@mui/material/styles";
import type { SimplifiedAlbum } from "../../../models/album";
import { Box, Grid, Typography } from "@mui/material";
import { MicVocal } from "lucide-react";

interface AlbumsProps {
  albums: SimplifiedAlbum[];
}

const SearchAlbumContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "48px",
});

const SearchAlbumsResultArea = styled(Box)(({ theme }) => ({
  width: "189px",
  height: "264px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "8px",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    backgroundColor: `${alpha(theme.palette.background.default, 0.5)}`,
  },
}));

const SearchAlbumNoCoverArea = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "165px",
  width: "165px",
  backgroundColor: theme.palette.background.default,
  borderRadius: "0.5rem",
  boxShadow: "0 0.2rem 0.5rem #00000012",
}));

const SearchAlbumNoCover = styled(Box)({
  height: "64px",
  width: "64px",
});

const SearchAlbumCoverArea = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "165px",
  width: "165px",
});

const SearchAlbumCover = styled("img")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "165px",
  height: "165px",
  borderRadius: "0.5rem",
  boxShadow: "0 0.2rem 0.5rem #00000012",
});

const SearchAlbumTextInfo = styled(Box)({
  width: "165px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "flex-start",
  gap: "4px",
});

const SearchAlbumTitle = styled(Typography)({
  "&:hover": {
    textDecoration: "underline",
  },
});

const Albums = ({ albums }: AlbumsProps) => {
  return (
    <SearchAlbumContainer>
      <Typography variant="h1" marginBottom={"0.5rem"}>
        앨범
      </Typography>
      <Grid
        width={"100%"}
        container
        spacing={{ xl: 1, lg: 2, md: 2, sm: 4, xs: 6 }}
      >
        {albums.slice(0, 6).map((album) => {
          return (
            <Grid size={{ lg: 2, md: 4, xs: 6, xl: 2 }}>
              <SearchAlbumsResultArea>
                {album.images && album.images.length > 0 ? (
                  <SearchAlbumCoverArea>
                    <SearchAlbumCover src={album.images?.[0].url} />
                  </SearchAlbumCoverArea>
                ) : (
                  <SearchAlbumNoCoverArea>
                    <SearchAlbumNoCover>
                      <MicVocal />
                    </SearchAlbumNoCover>
                  </SearchAlbumNoCoverArea>
                )}
                <SearchAlbumTextInfo>
                  <SearchAlbumTitle variant="h2" fontWeight={400}>
                    {album.name.length > 30
                      ? album.name.slice(0, 30) + "..."
                      : album.name}
                  </SearchAlbumTitle>
                  <Typography variant="body1" color="text.secondary">
                    {album.release_date.slice(0, 4)} • {album.artists[0].name}
                  </Typography>
                </SearchAlbumTextInfo>
              </SearchAlbumsResultArea>
            </Grid>
          );
        })}
      </Grid>
    </SearchAlbumContainer>
  );
};

export default Albums;
