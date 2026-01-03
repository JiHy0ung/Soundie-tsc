import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import { AudioLines, Search } from "lucide-react";

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
  marginBottom: "1rem",
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  width: "60%",
  minWidth: "16rem",
  marginTop: "0.5rem",
  marginInline: "20rem",
  backgroundColor: theme.palette.background.default,
  borderRadius: "1rem",

  "& .MuiInputBase-root": {
    borderRadius: "1rem",
    height: "2.625rem",
    fontSize: "0.9rem",
  },

  "& .MuiInputBase-input": {
    padding: "0 0.5rem",
    height: "100%",
    boxSizing: "border-box",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderWidth: "1px",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
    },
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: "3.5rem",
  height: "3.5rem",
  marginTop: "1.625rem",
  marginBottom: "1.625rem",
  borderRadius: "50%",
  backgroundColor: alpha(theme.palette.secondary.main, 0.15),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.secondary.main,
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
      <IconBox>
        <AudioLines size={22} />
      </IconBox>
      <SearchTitle>아직 담긴 곡이 없네요.</SearchTitle>
      <SearchDescription>
        좋아하는 음악으로 이 공간을 채워보세요.
      </SearchDescription>
      <SearchInput
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="곡이나 아티스트를 검색해보세요."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} />
            </InputAdornment>
          ),
        }}
      />
      {result?.pages.map((item) => {
        if (!item.tracks) return false;
        return <SearchResultList list={item.tracks?.items} />;
      })}
    </SearchContainer>
  );
};

export default EmptyPlaylistWithSearch;
