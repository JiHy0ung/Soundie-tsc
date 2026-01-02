import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  type BoxProps,
} from "@mui/material";
import { Music } from "lucide-react";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const PlaylistContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
  gap: "2rem",
  padding: "2rem",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "1rem",
  [theme.breakpoints.down("md")]: {
    gap: "1rem",
  },
}));

const PlaylistHeaderBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  gap: "2rem",
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

const TrackListTable = styled(Table)({});

const TrackListTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const TrackListTableCell = styled(TableCell)(({ theme }) => ({
  padding: "0.5rem 1rem",
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
  letterSpacing: -0.3,
}));

const TrackListTableContainer = styled(TableContainer)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  paddingInline: "0.5rem",
  overflowY: "auto",
  overflowX: "hidden",

  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const TrackListTableBody = styled(TableBody)({});

const PlaylistDetailPage = () => {
  const { ref, inView } = useInView();
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({ playlist_id: id || "" });
  const {
    data: tracks,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({
    playlist_id: id || "",
    limit: PAGE_LIMIT,
    offset: 0,
  });
  const { data: user } = useGetCurrentUserProfile();

  console.log("ttt", tracks);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (id === undefined && !user) return <Navigate to="/" />;

  return (
    <PlaylistContainer>
      <PlaylistHeaderBox>
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
            {playlist?.type?.toUpperCase()}ㆍ총 {playlist?.tracks?.total}곡
          </PlaylistInfoText>
        </PlaylistTextBox>
      </PlaylistHeaderBox>
      {playlist?.tracks?.total === 0 ? (
        "search"
      ) : (
        <TrackListTableContainer>
          <TrackListTable stickyHeader>
            <TrackListTableHead>
              <TableRow>
                <TrackListTableCell sx={{ borderRadius: "0.5rem 0 0 0" }}>
                  노래
                </TrackListTableCell>
                <TrackListTableCell>앨범</TrackListTableCell>
                <TrackListTableCell>재생시간</TrackListTableCell>
                <TrackListTableCell sx={{ borderRadius: " 0 0.5rem 0 0 " }}>
                  추가한 날짜
                </TrackListTableCell>
              </TableRow>
            </TrackListTableHead>
            <TrackListTableBody>
              {tracks?.pages.map((page) =>
                page.items.map((item, ItemIndex) => {
                  return <DesktopPlaylistItem key={ItemIndex} item={item} />;
                })
              )}
            </TrackListTableBody>
            <div ref={ref} style={{ color: "transparent" }}>
              end
            </div>
          </TrackListTable>
        </TrackListTableContainer>
      )}
    </PlaylistContainer>
  );
};

export default PlaylistDetailPage;
