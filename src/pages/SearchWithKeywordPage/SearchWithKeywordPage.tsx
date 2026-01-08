import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { SEARCH_TYPE } from "../../models/search";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SearchInput } from "../../common/components/SearchInput";
import { useParams } from "react-router";
import Tracks from "./components/Tracks";
import Albums from "./components/Albums";
import Artists from "./components/Artists";

const SearchWithKeywordPageContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  paddingInline: "24px",
  paddingTop: "24px",

  overflowX: "hidden",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#ffffff4c",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#ffffff80",
  },
}));

const SearchWithKeywordNoResultBox = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const SearchWithKeywordTrackBox = styled(Box)({});

const SearchWithKeywordArtistBox = styled(Box)({});

const SearchWithKeywordAlbumBox = styled(Box)({});

const SearchWithKeywordPage = () => {
  const { keyword } = useParams<{ keyword: string }>();

  const { data } = useSearchItemsByKeyword({
    q: keyword || "",
    type: [SEARCH_TYPE.TRACK, SEARCH_TYPE.ARTIST, SEARCH_TYPE.ALBUM],
    limit: PAGE_LIMIT,
    offset: 0,
  });

  const hasTrack = data?.pages.some((page) => page.tracks?.items.length);
  const hasArtist = data?.pages.some((page) => page.artists?.items.length);
  const hasAlbum = data?.pages.some((page) => page.albums?.items.length);

  const hasNoResult = !hasTrack && !hasArtist && !hasAlbum;

  console.log("dd", data);

  return (
    <SearchWithKeywordPageContainer>
      <SearchInput initialValue={keyword} />
      {keyword && data && hasNoResult ? (
        <SearchWithKeywordNoResultBox>
          <Typography variant="h1" color="#ffffff">
            "{keyword}"과(와) 일치하는 결과가 없습니다
          </Typography>
          <Typography variant="body1" color="#ffffff">
            입력한 단어의 철자가 맞는지 확인하거나 짧은 키워드 또는 다른
            키워드를 사용하세요.
          </Typography>
        </SearchWithKeywordNoResultBox>
      ) : (
        <>
          <SearchWithKeywordTrackBox>
            {data?.pages.map((item, index) => {
              if (!item.tracks) return null;
              return <Tracks key={index} tracks={item.tracks.items} />;
            })}
          </SearchWithKeywordTrackBox>

          <SearchWithKeywordArtistBox>
            {data?.pages.map((item, index) => {
              if (!item.artists) return null;
              return <Artists key={index} artists={item.artists.items} />;
            })}
          </SearchWithKeywordArtistBox>

          <SearchWithKeywordAlbumBox>
            {data?.pages.map((item, index) => {
              if (!item.albums) return null;
              return <Albums key={index} albums={item.albums.items} />;
            })}
          </SearchWithKeywordAlbumBox>
        </>
      )}
    </SearchWithKeywordPageContainer>
  );
};

export default SearchWithKeywordPage;
