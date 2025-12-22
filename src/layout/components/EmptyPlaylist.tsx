import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const EmptyPlaylistContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "1rem 1rem",
  gap: "2.5rem",
});

const EmptyMessage = styled(Typography)(({ theme }) => ({
  fontSize: "0.95rem",
  color: theme.palette.text.secondary,
  textAlign: "center",
  fontWeight: 400,
}));

const EmptyPlaylistButton = styled(Button)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.875rem 2rem",
  background: "rgba(30, 41, 59, 0.3)",
  border: "1px solid rgba(148, 163, 184, 0.1)",
  borderRadius: "1rem",
  color: theme.palette.text.primary,
  fontWeight: 500,
  fontSize: "0.825rem",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    background: `${theme.palette.error.main}50`,
    borderColor: `${theme.palette.error.main}80`,
    boxShadow: `
      0 0 1.5rem ${theme.palette.error.main}80,
      0 0 2.5rem ${theme.palette.error.main}40,
      inset 0 0 1.5rem ${theme.palette.error.main}30
    `,
  },

  "&:active": {
    transform: "scale(0.98)",
  },
}));

const EmptyPlaylist = () => {
  return (
    <EmptyPlaylistContainer>
      <EmptyMessage>나만의 플레이리스트를 만들어보세요!</EmptyMessage>
      <EmptyPlaylistButton disableRipple>
        <span>플레이리스트 만들기</span>
      </EmptyPlaylistButton>
    </EmptyPlaylistContainer>
  );
};

export default EmptyPlaylist;
