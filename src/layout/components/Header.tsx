import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import LoginButton from "../../common/components/LoginButton";

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

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <TitleText onClick={() => navigate("/")}>Soundie</TitleText>
      <LoginButton />
    </HeaderContainer>
  );
};

export default Header;
