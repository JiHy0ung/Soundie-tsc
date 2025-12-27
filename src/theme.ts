import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f5869eff",
    },
    secondary: {
      main: "#06b6d4",
    },
    error: {
      main: "#ec4899",
    },
    background: {
      default: "#f0f0f0ff",
      paper: "#e6e6e6ff",
    },
    text: {
      primary: "#111111ff",
      secondary: "#252525ff",
    },
    action: {
      hover: "#334155",
      active: "#475569",
    },
  },
  typography: {
    fontFamily: "Pretendard, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "24px",
    },
    h2: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "14px",
    },
    subtitle1: {
      fontSize: "0.6875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#7c3aed",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#6d28d9",
          },
        },
        containedSecondary: {
          backgroundColor: "#06b6d4",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#0891b2",
          },
        },
        containedError: {
          backgroundColor: "#ec4899",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#db2777",
          },
        },
        sizeLarge: {
          padding: "8px 32px",
          fontWeight: 700,
          fontSize: "16px",
        },
      },
    },
  },
});

export default theme;
