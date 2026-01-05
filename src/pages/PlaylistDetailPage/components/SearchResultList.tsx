import { Box, Button, Typography, type BoxProps } from "@mui/material";
import type { Track } from "../../../models/track";
import { alpha, styled } from "@mui/material/styles";
import { Plus } from "lucide-react";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import { useParams } from "react-router";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";

interface SearchResultListProps {
  list: Track[];
}

const ListContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

const ResultContainer = styled(Box)(({ theme }) => ({
  minWidth: "25rem",
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "0.5rem",
  backgroundColor: `${alpha(theme.palette.background.default, 0.65)}`,
  padding: "0.5rem",
  borderRadius: "0.2rem",
  boxSizing: "border-box",
}));

const AlbumImage = styled(Box)<BoxProps<"img">>({
  width: "2.625rem",
  height: "2.625rem",
  borderRadius: "0.15rem",
  flexShrink: 0,
  objectFit: "cover",
});

const TextBox = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "start",
  minWidth: 0,
});

const Title = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 400,
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const Artist = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  fontWeight: 400,
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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

const SearchResultList = ({ list }: SearchResultListProps) => {
  const { data: user } = useGetCurrentUserProfile();
  const { mutate: addItem } = useAddItemToPlaylist();
  const { id } = useParams<{ id: string }>();

  const handleAddTrackToPlaylist = (uri: string) => {
    if (user && id) {
      addItem({ playlist_id: id, uris: [uri] });
      console.log(uri);
    }
  };

  console.log("ll", list);

  return (
    <ListContainer>
      {list.map((track, index) => (
        <ResultContainer key={track.id || index}>
          <AlbumImage component={"img"} src={track.album?.images?.[0].url} />
          <TextBox>
            <Title>{track.name}</Title>
            <Artist>{track.artists?.[0].name}</Artist>
          </TextBox>
          <AddButton
            disableRipple
            onClick={() => {
              if (track.uri) {
                handleAddTrackToPlaylist(track.uri);
              }
            }}
          >
            <Plus strokeWidth={1.5} size={16} />
          </AddButton>
        </ResultContainer>
      ))}
    </ListContainer>
  );
};

export default SearchResultList;
