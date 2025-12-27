import { Box, Typography, type BoxProps } from "@mui/material";
import { alpha, keyframes, styled } from "@mui/material/styles";

interface CardProps {
  image: string;
  name: string;
  artist: string;
}

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const CardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.325rem",
}));

const AlbumBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "200px",
  height: "200px",
  backgroundColor: "#fafafaff",
  border: `1px solid ${theme.palette.background.paper}`,
  borderRadius: "1rem",
  boxShadow: `0 0.3rem 0.3rem ${theme.palette.background.paper}`,
  cursor: "pointer",

  "&:hover .album-cover": {
    animation: `${rotate} 5s linear infinite`,
  },

  "&::after": {
    position: "absolute",
    content: '""',
    width: "30px",
    height: "30px",
    backgroundColor: alpha(theme.palette.background.paper, 0.3),
    borderRadius: "50%",
    backdropFilter: "blur(3px)",
    border: `15px solid rgba(0,0,0,0.1)`,
    boxShadow: `0 0 0 5px rgba(0,0,0,0.1)`,
  },
  "&::before": {
    position: "absolute",
    content: '""',
    width: "20px",
    height: "20px",
    background: "radial-gradient(circle, rgba(0,0,0) 0%, rgba(0,0,0,0.3) 40%)",
    borderRadius: "50%",
    zIndex: 1,
  },
}));

const AlbumCover = styled(Box)<BoxProps<"img">>(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "150px",
  maxHeight: "150px",
  borderRadius: "50% ",
  overflow: "hidden",
  boxShadow: `
  0 0 0 0.4rem ${theme.palette.background.paper},
  inset 0 6px 10px rgba(0,0,0,0.15)
`,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const AlbumTextBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const AlbumTitleText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  color: theme.palette.text.primary,
  maxWidth: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const AlbumArtistText = styled(Typography)(({ theme }) => ({
  fontSize: "0.825rem",
  fontWeight: "300",
  color: theme.palette.text.secondary,
  maxWidth: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

const Card = ({ image, name, artist }: CardProps) => {
  return (
    <CardContainer>
      <AlbumBox>
        <AlbumCover
          component={"img"}
          src={image}
          className="album-cover"
        ></AlbumCover>
      </AlbumBox>
      <AlbumTextBox>
        <AlbumTitleText>{name}</AlbumTitleText>
        <AlbumArtistText>{artist}</AlbumArtistText>
      </AlbumTextBox>
    </CardContainer>
  );
};

export default Card;
