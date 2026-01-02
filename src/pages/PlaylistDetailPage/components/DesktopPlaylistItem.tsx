import { TableCell, TableRow } from "@mui/material";
import type { PlaylistTrack } from "../../../models/playlist";
import type { Episode, Track } from "../../../models/track";

interface DesktopPlaylistItemProps {
  item: PlaylistTrack;
}

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
    <TableRow>
      <TableCell>{item.track.name || ""}</TableCell>
      <TableCell>
        {isEpisode(item.track) ? "N/A" : item.track.album?.name}
      </TableCell>
      <TableCell>{formatDuration(item.track.duration_ms)}</TableCell>
      <TableCell>{formatDate(item.added_at)}</TableCell>
    </TableRow>
  );
};

export default DesktopPlaylistItem;
