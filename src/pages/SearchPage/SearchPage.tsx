import { Box, Typography } from "@mui/material";
import useGetSeveralBrowseCategories from "../../hooks/useGetSeveralBrowseCategories";
import { styled } from "@mui/material/styles";
import { Grid, type BoxProps } from "@mui/system";
import { useMemo } from "react";
import { SearchInput } from "../../common/components/SearchInput";

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

  return (
    <SearchPageContainer>
      <SearchInput />
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
