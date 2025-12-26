import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router";
import { House, Search } from "lucide-react";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import Header from "./components/Header";

const LayoutContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  padding: "0rem 1rem 1rem 1rem",
});

const LayoutBox = styled(Box)({
  display: "flex",
  height: "100vh",
  gap: "0.5rem",
});

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: "330px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "1rem",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: "1rem",
  display: "flex",
  marginBottom: "8px",
  marginRight: "8px",
  color: theme.palette.text.primary,
}));

const NavList = styled("ul")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.825rem",
  listStyle: "none",
  width: "100%",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "0.825rem 0.825rem 1rem 0.825rem",
  gap: "0.625rem",
  textDecoration: "none",
  background: "rgba(30, 41, 59, 0.3)",
  border: "1px solid rgba(148, 163, 184, 0.1)",
  borderRadius: "0.625rem",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  color: theme.palette.text.secondary,

  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "3px",
    height: 0,
    background: theme.palette.primary.main,
    borderRadius: "0 2px 2px 0",
    opacity: 0,
    transition:
      "height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  "&:hover": {
    color: theme.palette.text.primary,
    background: `${theme.palette.primary.main}30`,
    borderColor: `${theme.palette.primary.main}50`,
    boxShadow: `
      0 8px 16px ${theme.palette.primary.main}30,
      inset 0 1px 20px ${theme.palette.primary.main}10
    `,
    transform: "translateX(8px)",
  },

  "&.active": {
    color: theme.palette.text.primary,
    background: `${theme.palette.primary.main}30`,
    borderColor: `${theme.palette.primary.main}80`,
    boxShadow: `
      0 0 20px ${theme.palette.primary.main}50,
      inset 0 0 20px ${theme.palette.primary.main}30
    `,
  },

  "&.active::before": {
    height: "50%",
    opacity: 1,
  },
}));

const NavText = styled(Typography)({ fontWeight: 400, fontSize: "1rem" });

const LibraryContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const AppLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <LayoutBox>
        <SidebarContainer>
          <ContentBox>
            <NavList>
              <StyledNavLink to="/">
                <House strokeWidth={1.5} />
                <NavText>홈</NavText>
              </StyledNavLink>
              <StyledNavLink to="/search">
                <Search strokeWidth={1.5} />
                <NavText>검색</NavText>
              </StyledNavLink>
            </NavList>
          </ContentBox>
          <LibraryContainer>
            <LibraryHead />
            <Library />
          </LibraryContainer>
        </SidebarContainer>
        <Outlet />
      </LayoutBox>
    </LayoutContainer>
  );
};

export default AppLayout;
