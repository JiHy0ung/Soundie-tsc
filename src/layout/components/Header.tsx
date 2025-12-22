import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";

const HeaderContainer = styled(Box)({
  display: "flex",
  padding: "1rem",
});

const TitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "2rem",
  fontFamily: "Cafe24ProUp",
  cursor: "pointer",
}));

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <TitleText onClick={() => navigate("/")}>Soundie</TitleText>
    </HeaderContainer>
  );
};

export default Header;
