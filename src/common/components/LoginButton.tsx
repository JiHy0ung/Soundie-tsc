import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LogIn } from "lucide-react";
import { getSpotifyAuthUrl } from "../../utils/auth";

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
    color: theme.palette.error.main,

    "& svg": {
      color: theme.palette.error.main,
    },
  },
}));

const LoginButton = () => {
  const login = () => {
    getSpotifyAuthUrl();
  };
  return (
    <AuthButton onClick={login}>
      로그인
      <LogIn />
    </AuthButton>
  );
};

export default LoginButton;
