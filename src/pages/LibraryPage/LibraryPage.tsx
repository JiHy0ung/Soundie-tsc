import { useEffect } from "react";
import EmptyPlaylist from "../../layout/components/EmptyPlaylist";
import Playlist from "../../layout/components/Playlist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const LibraryContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  paddingInline: "0.5rem",
  overflowY: "auto",
  overflowX: "hidden",

  "&::-webkit-scrollbar": {
    width: "0.25rem",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#00000020",
    borderRadius: "10px",
    "&:hover": {
      background: "#00000030",
    },
  },
});

const LibraryTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "700",
  padding: "0 1rem 1rem 1rem ",
});

const LibraryPage = () => {
  const {
    data: playlist,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: PAGE_LIMIT,
    offset: 0,
  });
  const { data: user } = useGetCurrentUserProfile();
  const { ref, inView } = useInView();
  const navigate = useNavigate();

  const playlists = playlist?.pages.flatMap((page) => page.items) ?? [];

  const handleClick = (id: string) => {
    navigate(`/playlist/${id}`);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!user) return <EmptyPlaylist />;

  return (
    <LibraryContainer>
      <LibraryTitle>{user.display_name}님의 라이브러리</LibraryTitle>
      {playlists && playlists.length > 0 ? (
        <>
          {playlists.map((playlist, index) => (
            <Playlist
              key={index}
              playlist={playlist}
              handleClick={handleClick}
            />
          ))}
          <div ref={ref} style={{ color: "transparent" }}>
            end
          </div>
        </>
      ) : (
        <EmptyPlaylist />
      )}
    </LibraryContainer>
  );
};

export default LibraryPage;
