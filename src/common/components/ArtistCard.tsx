import { Box, Typography, type BoxProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

interface CardProps {
  image: string;
  name: string;
}

const CardContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.325rem",
});

const ArtistBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "180px",
  height: "180px",
  borderRadius: "1rem",
  cursor: "pointer",

  [theme.breakpoints.down("sm")]: {
    width: "150px",
    height: "150px",
  },
}));

const ArtistCover = styled(Box)<BoxProps<"img">>(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "200px",
  maxHeight: "200px",
  borderRadius: "50%",
  overflow: "hidden",
  boxShadow: `0 0.5rem 0.5rem ${alpha(theme.palette.text.secondary, 0.2)}`,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "160px",
    maxHeight: "160px",
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const ArtistTextBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const ArtistTitleText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  color: theme.palette.text.primary,
  maxWidth: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    maxWidth: "160px",
  },
}));

const ArtistCard = ({ image, name }: CardProps) => {
  return (
    <CardContainer>
      <ArtistBox>
        <ArtistCover component={"img"} src={image}></ArtistCover>
      </ArtistBox>
      <ArtistTextBox>
        <ArtistTitleText>{name}</ArtistTitleText>
      </ArtistTextBox>
    </CardContainer>
  );
};

export default ArtistCard;
