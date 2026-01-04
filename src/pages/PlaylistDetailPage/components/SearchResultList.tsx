import { Box, Typography, type BoxProps } from "@mui/material";
import type { Track } from "../../../models/track";
import { alpha, styled } from "@mui/material/styles";

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
  minWidth: "27rem",
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

const SearchResultList = ({ list }: SearchResultListProps) => {
  return (
    <ListContainer>
      {list.map((track, index) => (
        <ResultContainer key={track.id || index}>
          <AlbumImage component={"img"} src={track.album?.images?.[0].url} />
          <TextBox>
            <Title>{track.name}</Title>
            <Artist>{track.artists?.[0].name}</Artist>
          </TextBox>
        </ResultContainer>
      ))}
    </ListContainer>
  );
};

export default SearchResultList;
