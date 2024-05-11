import React, { useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "../../api/auth.api.mjs";

export default function Nav() {
  const [state, setState] = React.useState({
    mobileView: false,
    drawerOpen: false,
  });

  const navigate = useNavigate();

  const { login, register, isAuthenticated, user, logout, getToken } =
    useKindeAuth();

  const SignMutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {},
    onError: () => {},
  });

  const SignOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {},
    onError: () => {},
  });

  useEffect(() => {
    const fetchTokenAndAuthenticate = async () => {
      const accessToken = await getToken();

      console.log(accessToken);

      if (isAuthenticated) {
        await SignMutation.mutateAsync(accessToken);
      } else if (!isAuthenticated) {
        await SignOutMutation.mutateAsync();
      }
    };

    fetchTokenAndAuthenticate();
  }, [isAuthenticated]);

  const { mobileView, drawerOpen } = state;

  React.useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 600
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Master Learn</Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {!isAuthenticated && (
            <>
              <Button
                sx={{
                  ":hover": {
                    borderBottom: "3px solid white",
                  },
                }}
                variant="text"
                onClick={register}
                color="inherit"
              >
                Register
              </Button>
              <Button
                sx={{
                  ":hover": {
                    borderBottom: "3px solid white",
                  },
                }}
                onClick={login}
                color="inherit"
              >
                Log In
              </Button>
            </>
          )}

          {isAuthenticated && (
            <>
              <Button color="inherit" onClick={logout}>
                Log Out
              </Button>
              <IconButton color="inherit">
                <Avatar src={user.picture} />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Galaxy Z</Typography>

        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div>{getDrawerChoices()}</div>
        </Drawer>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return (
      <List sx={{ minWidth: "60vw", m: 2 }}>
        {isAuthenticated && (
          <>
            <IconButton color="inherit">
              <Avatar src={user.picture} />
            </IconButton>
            <Button color="inherit" onClick={logout}>
              Log Out
            </Button>
          </>
        )}

        {[].map((text, index) => (
          <ListItem onClick={() => navigate(text)} key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <div>
      <AppBar position="static">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </div>
  );
}
