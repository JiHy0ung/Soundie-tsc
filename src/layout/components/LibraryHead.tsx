import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Bookmark, Plus } from "lucide-react";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/auth";

const LibraryHeadContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem 0.5rem",
  marginBottom: "0.5rem",
});

const TitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.825rem",
  color: theme.palette.text.primary,
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 400,
  fontSize: "1.125rem",
  color: theme.palette.text.primary,
}));

const LibraryHeadAddButton = styled(Button)(({ theme }) => ({
  position: "relative",
  minWidth: "40px",
  width: "40px",
  height: "40px",
  margin: 0,
  padding: 0,
  background: "rgba(178, 178, 178, 0.3)",
  border: "1px solid rgba(148, 163, 184, 0.1)",
  borderRadius: "12px",
  color: theme.palette.text.secondary,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    background: `${theme.palette.primary.main}30`,
    borderColor: `${theme.palette.primary.main}50`,
    color: theme.palette.text.primary,
    transform: "scale(1.05)",
    boxShadow: `
      0 4px 12px ${theme.palette.primary.main}20,
      inset 0 1px 10px ${theme.palette.primary.main}10
    `,
  },

  "&:active": {
    transform: "scale(0.95)",
  },
}));

const LibraryHead = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const { data: user } = useGetCurrentUserProfile();

  const handleCreatePlaylist = () => {
    if (!user) {
      getSpotifyAuthUrl();
    }
    createPlaylist({ name: "나의 플레이리스트" });
  };

  return (
    <LibraryHeadContainer>
      <TitleBox>
        <Bookmark strokeWidth={1.5} size={20} />
        <HeaderTitle>나의 라이브러리</HeaderTitle>
      </TitleBox>
      <LibraryHeadAddButton disableRipple onClick={handleCreatePlaylist}>
        <Plus strokeWidth={1.5} size={20} />
      </LibraryHeadAddButton>
    </LibraryHeadContainer>
  );
};

export default LibraryHead;
