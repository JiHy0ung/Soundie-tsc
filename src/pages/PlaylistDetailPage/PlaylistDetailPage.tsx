import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { styled } from "@mui/material/styles";
import { Box, Typography, type BoxProps } from "@mui/material";
import { Music } from "lucide-react";

const PlaylistContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  gap: "2rem",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "1rem",
  padding: "2rem",
  [theme.breakpoints.down("md")]: {
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
    gap: "1rem",
  },
}));

const PlaylistImage = styled(Box)<BoxProps<"img">>({
  width: "16.875rem",
  borderRadius: "0.625rem",
});

const PlaylistImagePlaceholder = styled(Box)(({ theme }) => ({
  width: "16.875rem",
  height: "16.875rem",
  borderRadius: "0.625rem",
  backgroundColor: theme.palette.grey[400],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.grey[700],
}));

const PlaylistTextBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

const PlaylistName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "2rem",
  fontWeight: "500",
}));

const PlaylistOwner = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "1rem",
  fontWeight: "500",
}));

const PlaylistInfoText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  fontWeight: "400",
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({ playlist_id: id || "" });
  const { data: user } = useGetCurrentUserProfile();

  if (id === undefined && !user) return <Navigate to="/" />;

  console.log("pp", playlist);

  return (
    <PlaylistContainer>
      {playlist?.images?.[0].url ? (
        <PlaylistImage component={"img"} src={playlist?.images?.[0].url} />
      ) : (
        <PlaylistImagePlaceholder>
          <Music size={50} />
        </PlaylistImagePlaceholder>
      )}

      <PlaylistTextBox>
        <PlaylistName>{playlist?.name}</PlaylistName>
        <PlaylistOwner>{playlist?.owner?.display_name}</PlaylistOwner>
        <PlaylistInfoText>
          총 {playlist?.tracks?.total}곡ㆍ{playlist?.type?.toUpperCase()}
        </PlaylistInfoText>
      </PlaylistTextBox>
    </PlaylistContainer>
  );
};

export default PlaylistDetailPage;
