import type { Track } from "../../../models/track";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Play, Plus } from "lucide-react";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../../utils/auth";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";
import { useEffect, useState, type MouseEvent } from "react";
import { useInView } from "react-intersection-observer";

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
    "& .play-button": {
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

const TrackCoverContainer = styled(Box)({
  position: "relative",
  width: "40px",
  height: "40px",
});

const PlayButton = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0,
  transition: "opacity 0.2s ease",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  pointerEvents: "none",
});

const SearchTrackTrackCover = styled("img")({
  display: "block",
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

const AddButton = styled(Button)(({ theme }) => ({
  position: "relative",
  minWidth: "30px",
  width: "30px",
  height: "30px",
  marginRight: "0.3rem",
  padding: 0,
  background: "rgba(178, 178, 178, 0.3)",
  border: "1px solid rgba(148, 163, 184, 0.1)",
  borderRadius: "0.5rem",
  color: theme.palette.text.secondary,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    background: `${alpha(theme.palette.primary.main, 0.7)}`,
    border: `0.5px solid ${theme.palette.primary.main}`,
    color: theme.palette.background.default,
    transform: "scale(1.05)",
    boxShadow: `
      0 4px 12px ${theme.palette.primary.main}20,
      inset 0 1px 10px ${theme.palette.primary.main}10
    `,
  },

  "&:active": {
    transform: "scale(0.95)",
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    marginTop: "8px",
    minWidth: "220px",
    maxHeight: "400px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "12px 16px",
  fontSize: "14px",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const Tracks = ({ tracks }: TracksProps) => {
  const { data: user } = useGetCurrentUserProfile();
  const { mutate: addItem } = useAddItemToPlaylist();

  const {
    data: playlistData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 50,
    offset: 0,
  });

  const playlists = playlistData?.pages.flatMap((page) => page.items) || [];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTrackUri, setSelectedTrackUri] = useState<string>("");
  const open = Boolean(anchorEl);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    trackUri: string
  ) => {
    event.stopPropagation();

    if (!user) {
      getSpotifyAuthUrl();
      return;
    }

    setAnchorEl(event.currentTarget);
    setSelectedTrackUri(trackUri);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTrackUri("");
  };

  const handleAddTrackToPlaylist = (playlistId: string) => {
    if (user && selectedTrackUri && playlistId) {
      addItem({ playlist_id: playlistId, uris: [selectedTrackUri] });
    }
    handleClose();
  };

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

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
                <SearchTrackTrackResultArea key={track.id}>
                  <SearchTrackTrackResultTrackArea>
                    <TrackCoverContainer>
                      <SearchTrackTrackCover
                        src={track.album?.images[0].url}
                        alt={track.name}
                      />
                      <PlayButton className="play-button">
                        <Play fill="#fff" size={20} />
                      </PlayButton>
                    </TrackCoverContainer>
                    <SearchTrackTrackTextInfo>
                      <SearchTrackTrackTitle variant="h2" fontWeight={400}>
                        {track.name}
                      </SearchTrackTrackTitle>
                      <SearchTrackTrackArtist variant="body1" color="#b3b3b3">
                        {track.artists?.map((artist) => artist.name).join(", ")}
                      </SearchTrackTrackArtist>
                    </SearchTrackTrackTextInfo>
                  </SearchTrackTrackResultTrackArea>
                  <AddButton
                    disableRipple
                    onClick={(e) => {
                      if (track.uri) {
                        handleClick(e, track.uri);
                      }
                    }}
                  >
                    <Plus strokeWidth={1.5} size={16} />
                  </AddButton>
                </SearchTrackTrackResultArea>
              );
            })}
          </SearchTrackTrackResultContainer>
        </Grid>
      </Grid>

      <StyledMenu
        id="playlist-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "add-button",
          onScroll: handleScroll,
        }}
      >
        {playlists.length === 0 ? (
          <StyledMenuItem disabled>플레이리스트가 없습니다</StyledMenuItem>
        ) : (
          playlists.map((playlist) => (
            <>
              <StyledMenuItem
                key={playlist.id}
                onClick={() => {
                  if (playlist.id) {
                    handleAddTrackToPlaylist(playlist.id);
                  }
                }}
              >
                {playlist.name}
              </StyledMenuItem>
              <div ref={ref} style={{ color: "transparent" }}>
                end
              </div>
            </>
          ))
        )}
        {isFetchingNextPage && (
          <Box display="flex" justifyContent="center" padding={2}>
            <CircularProgress size={20} />
          </Box>
        )}
      </StyledMenu>
    </SearchTrackContainer>
  );
};

export default Tracks;
