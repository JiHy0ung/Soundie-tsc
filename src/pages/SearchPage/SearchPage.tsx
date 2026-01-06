import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import useGetSeveralBrowseCategories from "../../hooks/useGetSeveralBrowseCategories";
import { styled } from "@mui/material/styles";
import { alpha, Grid, type BoxProps } from "@mui/system";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

const SearchPageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex ",
  flexDirection: "column",
  padding: "1.625rem",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "1rem",
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  width: "70%",
  maxWidth: "30rem",
  minWidth: "18rem",
  marginBlock: "1rem",
  backgroundColor: theme.palette.background.default,
  borderRadius: "1rem",

  "& .MuiInputBase-root": {
    border: `0.5px solid ${alpha(theme.palette.text.secondary, 0.5)}`,
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

const CategoryTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.625rem",
  fontWeight: 800,
  marginBottom: "1rem",
}));

const CategoryBox = styled(Box)({
  position: "relative",
  width: "100%",
  height: "10rem",
  borderRadius: "0.75rem",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",

  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.35))",
    zIndex: 1,
  },

  "&:hover": {
    transform: "scale(1.04)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
  },

  "&:hover .img": {
    transform: "scale(1.15)",
    opacity: 0.85,
  },
});

const CategoryImage = styled(Box)<BoxProps<"img">>({
  position: "absolute",
  bottom: "-15%",
  right: "-20%",
  width: "80%",
  height: "80%",
  objectFit: "contain",
  transform: "rotate(12deg)",
  transition: "all 0.4s ease",
  zIndex: 0,
  pointerEvents: "none",
});

const CategoryText = styled(Typography)(() => ({
  position: "absolute",
  top: "1rem",
  left: "1rem",
  zIndex: 2,
  color: "#fff",
  fontSize: "1.2rem",
  fontWeight: 800,
  lineHeight: 1.2,
  maxWidth: "70%",
}));

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data: category } = useGetSeveralBrowseCategories();

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 90%, 85%)`;
  };

  const categoryColors = useMemo(() => {
    if (!category?.categories?.items) return {};

    return category.categories.items.reduce((acc, item) => {
      acc[item.id] = generateRandomColor();
      return acc;
    }, {} as Record<string, string>);
  }, [category]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  console.log("ccc", category);

  return (
    <SearchPageContainer>
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
      <CategoryTitle>모두 둘러보기</CategoryTitle>
      <Grid container spacing={3} sx={{ width: "100%" }}>
        {category?.categories?.items.map((item) => (
          <Grid
            size={{ xs: 6, sm: 4, md: 4, lg: 3, xl: 2.4 }}
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              window.open(
                `https://open.spotify.com/genre/${item.id}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            <CategoryBox sx={{ backgroundColor: categoryColors[item.id] }}>
              <CategoryImage
                component={"img"}
                src={item.icons[0].url}
                className="img"
              />
              <CategoryText className="p">{item.name}</CategoryText>
            </CategoryBox>
          </Grid>
        ))}
      </Grid>
    </SearchPageContainer>
  );
};

export default SearchPage;
