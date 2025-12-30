import { Box, Typography, type BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Music } from "lucide-react";
import type { SimplifiedPlaylist } from "../../models/playlist";

interface PlaylistProps {
  playlist: SimplifiedPlaylist;
  handleClick: (id: string) => void;
}

const PlaylistContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "0.875rem",
  marginBottom: "0.625rem",
  padding: "0.625rem 0.875rem",
  borderRadius: "0.5rem",
  border: "0.5px solid #00000018",
  backgroundColor: "#ffffff44",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#ffffff80",
    border: "0.5px solid #00000030",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
  },
});

const PlaylistImage = styled(Box)<BoxProps<"img">>({
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "0.25rem",
});

const PlaylistImagePlaceholder = styled(Box)(({ theme }) => ({
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "0.25rem",
  backgroundColor: theme.palette.grey[300],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.grey[600],
}));

const TextBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
});

const PlaylistNameText = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 500,
});

const PlaylistOwnerText = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));

const Playlist = ({ playlist, handleClick }: PlaylistProps) => {
  return (
    <PlaylistContainer onClick={() => handleClick(playlist.id || "")}>
      {playlist.images ? (
        <PlaylistImage
          component="img"
          src={playlist.images[0].url}
          alt={playlist.name || "Playlist"}
        />
      ) : (
        <PlaylistImagePlaceholder>
          <Music size={20} />
        </PlaylistImagePlaceholder>
      )}
      <TextBox>
        <PlaylistNameText>{playlist.name}</PlaylistNameText>
        <PlaylistOwnerText>{playlist.owner?.display_name}</PlaylistOwnerText>
      </TextBox>
    </PlaylistContainer>
  );
};

export default Playlist;
