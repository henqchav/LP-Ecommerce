import {
  AppBar,
  Button,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { openSidepanel } from "../slices/sidepanelSlice";
import { useLocation } from 'react-router-dom';

const AppNavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          style={{ fontFamily: "Kaushan Script, cursive" }}
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Hamburguesas de la 9 de Octubre
        </Typography>
        {location.pathname === '/catalogo' && (
          <IconButton
            className="mr-6"
            onClick={() => dispatch(openSidepanel({ id: "SHOPPING_CART" }))}
          >
            <Icon>shopping_cart</Icon>
          </IconButton>
        )}
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
