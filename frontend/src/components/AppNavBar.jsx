import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const AppNavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          style={{ fontFamily: "Kaushan Script, cursive" }}
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Hamburguesas de la 9 de Octubre
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
