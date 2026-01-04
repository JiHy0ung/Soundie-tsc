import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import { AudioLines, Frown, Search } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { PAGE_LIMIT } from "../../../configs/commonConfig";

const SearchContainer = styled(Box)({
  flex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  minHeight: 0,
  overflow: "hidden",
  paddingTop: "2rem",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
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
  maxWidth: "30rem",
  minWidth: "16rem",
  marginTop: "0.5rem",
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
  flexShrink: 0,
}));

const ResultBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  maxWidth: "30rem",
  minWidth: "16rem",
  width: "100%",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  marginTop: "1rem",
  paddingBottom: "1rem",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const EmptyStateBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  gap: "0.75rem",
  width: "100%",
});

const EmptyStateText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  textAlign: "center",
  lineHeight: 1.5,
}));

const EmptyStateKeyword = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.text.primary,
  fontWeight: 600,
  textAlign: "center",
}));

const LoadingBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem",
  width: "100%",
});

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {
    data: result,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.TRACK],
    limit: PAGE_LIMIT,
    offset: 0,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const totalTracks =
    result?.pages.reduce((total, page) => {
      return total + (page.tracks?.items?.length || 0);
    }, 0) || 0;

  const hasResults = totalTracks > 0;
  const hasKeyword = keyword.trim().length > 0;

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
      {!hasKeyword ? null : isLoading ? (
        <ResultBox>
          <LoadingBox>
            <CircularProgress size={32} />
          </LoadingBox>
        </ResultBox>
      ) : hasResults ? (
        <ResultBox>
          {result?.pages.map((item, index) => {
            if (!item.tracks?.items || item.tracks.items.length === 0)
              return null;
            return <SearchResultList key={index} list={item.tracks.items} />;
          })}
          <div ref={ref} style={{ height: "20px", width: "100%" }}>
            {isFetchingNextPage && (
              <LoadingBox sx={{ padding: "1rem" }}>
                <CircularProgress size={24} />
              </LoadingBox>
            )}
          </div>
        </ResultBox>
      ) : (
        <ResultBox>
          <EmptyStateBox>
            <Frown size={28} style={{ opacity: 0.4 }} />
            <EmptyStateKeyword>"{keyword}"</EmptyStateKeyword>
            <EmptyStateText>
              검색어와 매칭되는 결과가 없습니다.
              <br />
              다른 검색어로 시도해보세요.
            </EmptyStateText>
          </EmptyStateBox>
        </ResultBox>
      )}
    </SearchContainer>
  );
};

export default EmptyPlaylistWithSearch;
