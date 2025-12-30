import { Box } from "@mui/material";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";
import { styled } from "@mui/material/styles";
import Playlist from "./Playlist";

const LibraryContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingInline: "1.25rem",
});

const Library = () => {
  const { data: playlist } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

  console.log("pp", playlist);
  return (
    <LibraryContainer>
      {playlist && playlist.items.length > 0 ? (
        playlist.items.map((item) => (
          <Playlist
            name={item.name || "Untitled Playlist"}
            owner={item.owner?.display_name || "Unknown"}
            image={item.images?.[0]?.url || ""}
          />
        ))
      ) : (
        <EmptyPlaylist />
      )}
    </LibraryContainer>
  );
};

export default Library;
