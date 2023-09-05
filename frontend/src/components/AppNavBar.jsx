import {
  AppBar,
  Badge,
  Button,
  Icon,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openSidepanel } from "../slices/sidepanelSlice";
import { useLocation } from "react-router-dom";

const AppNavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderItems = useSelector(({ cart }) => cart.items);

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography
          style={{ fontFamily: "Kaushan Script, cursive" }}
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Hamburguesas de la 9 de Octubre
        </Typography>
        {location.pathname === "/catalogo" && (
          <IconButton
            className="mr-6"
            onClick={() => dispatch(openSidepanel({ id: "ORDER_STATUS" }))}
          >
            <Icon>track_changes</Icon>
          </IconButton>
        )}
        {location.pathname === "/catalogo" && (
          <IconButton
            className="mr-6"
            onClick={() => dispatch(openSidepanel({ id: "SHOPPING_CART" }))}
          >
            <Badge color="secondary" badgeContent={orderItems.length}>
              <Icon>shopping_cart</Icon>
            </Badge>
          </IconButton>
        )}
        <Link to="/login" style={{ color: 'white',textDecoration: 'none' }}>
             <Button color="inherit">Login</Button>
         </Link>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
