import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../../assets/images/WinShop Logo.png";
import { AppBar, Toolbar } from "@material-ui/core";
import { Hidden } from "@material-ui/core";
import { Button, IconButton, Typography } from "@material-ui/core";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import DropdownMenu from "./DropdownMenu";

const useStyles = makeStyles((theme) => ({
  containerBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "white"
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  toolbarGutters: {
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing(2),
    },
  },
  scrollTop: {
    zIndex: 2000,
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  buttonHome: {
    color: "#47B5FF",
    fontWeight: "bold",
    fontSize: "1.3rem",
    paddingRight: "10px",
    transition: "all 1s",
    "&:hover": {
      color: "#CD104D",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  iconHome: {
    margin: "0 10px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#47B5FF",
    transition: "all .5s",
    "&:hover": {
      color: "#47B5FF",
      backgroundColor: "white",
      border: "1px solid #9FC9F3",
    },
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.containerBar}>
        <Toolbar className={classes.toolbar} disableGutters>
          <Hidden xsDown>
            <Typography component={Link} to={"/"} style={{color: "#47B5FF", cursor: "pointer", fontSize: "2rem", textDecoration: "none"}} variant="h4">Winshop</Typography>
          </Hidden>
          <Hidden xsUp>
            <img src={Logo} alt="logo" width={70} height={70} />
            <IconButton
              className={classes.iconHome}
              aria-label="open drawer"
              edge="start"
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
          </Hidden>
          <Typography className={classes.title} variant="h5" noWrap>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
              <img style={{paddingLeft: "10px"}} src={Logo} alt="logo" width={70} height={70} />
              <Button className={classes.buttonHome} 
              component={Link} to={"/"}
              >
                Home
              </Button>
              <Button
                className={classes.buttonHome}
                component={Link}
                to={"/shop"}
              >
                Shop
              </Button>
            </div>
          </Typography>
          <DropdownMenu/>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
