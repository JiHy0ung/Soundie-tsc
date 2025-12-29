import { Avatar, Box, Typography, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { LogOut } from "lucide-react";

const HeaderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "1rem",
});

const TitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "2rem",
  fontFamily: "MaruBuri",
  fontWeight: "700",
  letterSpacing: -1,
  cursor: "pointer",
}));

const ProfileBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: `0 0 20px ${theme.palette.primary.main}60`,
  },
}));

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    marginTop: "0.5rem",
    borderRadius: "12px",
    minWidth: "fit-content",
    background: "#fafafaff",
    border: `0.5px solid #27001a23 !important`,
    boxShadow: "none !important",
  },
  "& .MuiList-root": {
    padding: "4px",
  },
});

const ProfileMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  gap: "0.5rem",
  padding: "8px 12px",
  borderRadius: "8px",
  transition: "all 0.5s ease",
  "& svg": {
    color: theme.palette.text.secondary,
  },
  "& span": {
    color: theme.palette.text.secondary,
  },
  "&:hover": {
    background: `${theme.palette.primary.main}20`,
    "& span": {
      color: theme.palette.text.primary,
    },
    "& svg": {
      color: theme.palette.error.main,
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const { data: userProfile } = useGetCurrentUserProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <HeaderContainer>
      <TitleText onClick={() => navigate("/")}>Soundie</TitleText>
      {userProfile ? (
        <ProfileBox>
          <ProfileAvatar
            alt={userProfile.display_name}
            src={userProfile.images?.[0]?.url}
            onClick={handleClick}
          />
          <ProfileMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <ProfileMenuItem onClick={handleLogout}>
              <LogOut size={16} />
              <span style={{ fontSize: "0.875rem" }}>로그아웃</span>
            </ProfileMenuItem>
          </ProfileMenu>
        </ProfileBox>
      ) : (
        <LoginButton />
      )}
    </HeaderContainer>
  );
};

export default Header;
