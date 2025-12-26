import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CommonLoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderRadius: "1rem",
  padding: "0.3rem 1rem",
  fontWeight: 700,
  fontSize: "0.825rem",
  letterSpacing: 2,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "transparent",
    textShadow: `
    0 0 4px ${theme.palette.secondary.main},
    0 0 10px ${theme.palette.secondary.main},
    0 0 20px ${theme.palette.secondary.main}
  `,
  },
}));

const LoginButton = () => {
  return <CommonLoginButton>로그인</CommonLoginButton>;
};

export default LoginButton;
