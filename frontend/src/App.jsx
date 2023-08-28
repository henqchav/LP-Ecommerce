import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { Provider } from "react-redux";
import store from "./reducer/store";

import PageBackground from "./components/PageBackground";
import AppRouter from "./components/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SnackbarStack from "./components/snackbar/SnackbarStack";

const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: () => document.getElementById("root"),
      },
    },
    MuiPopper: {
      defaultProps: {
        container: () => document.getElementById("root"),
      },
    },
    MuiDialog: {
      defaultProps: {
        container: () => document.getElementById("root"),
      },
    },
    MuiModal: {
      defaultProps: {
        container: () => document.getElementById("root"),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: "#D9D9D9",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          background: "#D9D9D9",
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#A1491B",
    },
    secondary: {
      main: "#6C6969",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <PageBackground>
              <SnackbarProvider
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <CssBaseline />
                <AppRouter />
                <SnackbarStack />
              </SnackbarProvider>
            </PageBackground>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </Provider>
  );
}

export default App;
