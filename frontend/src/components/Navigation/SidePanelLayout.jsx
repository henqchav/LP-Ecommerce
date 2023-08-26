import { useState } from "react";

import { Icon, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { closeSidepanel, openSidepanel } from "../../slices/sidepanelSlice";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  paddingLeft: 25,
  paddingRight: 10,
}));

const DrawerContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
}));

const SidePanelLayout = ({ render }) => {
  const dispatch = useDispatch();
  const sidepanel = useSelector(({ sidepanel }) => sidepanel.content);
  const open = useSelector(({ sidepanel }) => sidepanel.open);

  return (
    <Box sx={{ display: "flex" }}>
      <Main open={open}>
        <Toolbar />
        {render}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            height: "100%",
          },
        }}
        variant="persistent"
        elevation={10}
        anchor="right"
        open={open}
      >
        <Toolbar />
        <DrawerHeader>
          <Typography>Titulo</Typography>
          <Box flexGrow={1} />
          <IconButton onClick={() => dispatch(closeSidepanel({ clear: true }))}>
            <Icon>close</Icon>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerContent>Contenido</DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SidePanelLayout;
