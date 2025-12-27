import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router";

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

const AuthButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderRadius: "1rem",
  padding: "0.3rem 1rem",
  fontWeight: 700,
  fontSize: "0.825rem",
  letterSpacing: 2,
  transition: "all 0.3s ease",

  "& svg": {
    width: 18,
    height: 18,
    strokeWidth: 2,
    transition: "all 0.3s ease",
  },

  "&:hover": {
    backgroundColor: "transparent",

    "& svg": {
      color: theme.palette.secondary.main,
      filter: `
        drop-shadow(0 0 10px ${theme.palette.secondary.main})
      `,
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <TitleText onClick={() => navigate("/")}>Soundie</TitleText>
      <AuthButton>
        <LogIn />
      </AuthButton>
    </HeaderContainer>
  );
};

export default Header;
