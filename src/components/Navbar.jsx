import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "./utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "..";

export default function Navbar() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justifyContent="flex-end">
          {user ? (
            <Button
              onClick={() => {
                auth.signOut();
              }}
              variant="outlined"
              color="thirdly"
            >
              Logout
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button variant="outlined" color="thirdly">
                Login
              </Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
