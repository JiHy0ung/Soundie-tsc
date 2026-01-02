import { Box, TableCell, TableRow, type BoxProps } from "@mui/material";
import type { PlaylistTrack } from "../../../models/playlist";
import type { Episode, Track } from "../../../models/track";
import { alpha, styled } from "@mui/material/styles";

interface DesktopPlaylistItemProps {
  item: PlaylistTrack;
}

const TrackTableRow = styled(TableRow)(({ theme }) => ({
  borderRadius: "0.5rem",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:nth-of-type(odd)": {
    backgroundColor: `${alpha(theme.palette.background.default, 0.5)}`,
  },
  "&:nth-of-type(even)": {
    backgroundColor: `${alpha(theme.palette.background.default, 0)}`,
  },
  "&:hover": {
    backgroundColor: `${alpha(theme.palette.background.default, 1)}`,
    "& td": {
      color: theme.palette.error.main,
    },
  },
}));

const TrackTitle = styled(TableCell)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "0.5rem",
  border: "none",
});

const TrackCell = styled(TableCell)({
  padding: "0.5rem",
  border: "none",
});

const TrackImage = styled(Box)<BoxProps<"img">>({
  width: "40px",
  borderRadius: "0.2rem",
});

const DesktopPlaylistItem = ({ item }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  function formatDuration(milliseconds?: number) {
    if (!milliseconds) return "0:00";

    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function formatDate(isoString: string | null) {
    if (!isoString) return "unknown";

    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  return (
    <TrackTableRow>
      <TrackTitle>
        <TrackImage
          component={"img"}
          src={
            isEpisode(item.track) ? "No Image" : item.track.album?.images[0].url
          }
        />
        {item.track.name || ""}
      </TrackTitle>
      <TrackCell>
        {isEpisode(item.track) ? "N/A" : item.track.album?.name}
      </TrackCell>
      <TrackCell>{formatDuration(item.track.duration_ms)}</TrackCell>
      <TrackCell>{formatDate(item.added_at)}</TrackCell>
    </TrackTableRow>
  );
};

export default DesktopPlaylistItem;
