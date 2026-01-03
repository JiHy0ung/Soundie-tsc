import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";

const SearchContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const SearchTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const SearchDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  textAlign: "center",
  lineHeight: 1.6,
}));

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data: result } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.TRACK],
  });

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchTitle>아직 담긴 곡이 없네요.</SearchTitle>
      <SearchDescription>
        좋아하는 음악으로 이 공간을 채워보세요.
      </SearchDescription>
      <TextField value={keyword} onChange={handleSearchKeyword} />
      {result?.pages.map((item) => {
        if (!item.tracks) return false;
        return <SearchResultList list={item.tracks?.items} />;
      })}
    </SearchContainer>
  );
};

export default EmptyPlaylistWithSearch;
