import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Menu, Box, useMediaQuery } from "@material-ui/core";
import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DarkmodeButton from './DarkmodeButton';
import {getShowCart} from '../../actions/SidebarAction';
import Cart from "../Cart";

const useStyles = makeStyles((theme) => ({
  moreIcon: {
    color: "#000",
  },
  button: {
    color: "#000",
    fontWeight: "700",
    "&:hover": {
      color: "#F05454",
    },
  },

  buttonLogIn: {
    textTransform: "none",
    fontWeight: "700",
    fontSize: "1.1rem",
    backgroundColor: "#47B5FF",
    "&:hover": {
      color: "#FFE15D",
      backgroundColor: "#47B5FF"
    },
  },
  buttonSignUp: {
    textTransform: "none",
    color: "#47B5FF",
    //  width: "90px",
    border: "1px solid #F05454",
    fontWeight: "700",
    fontSize: "1.1rem",
    transition: "all .5s",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#2FA4FF",
      border: "none",
    },
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
  },
  cart: {
    position: "relative",
    padding: "5px",
    fontSize: "1.2rem",
    marginRight: "20px",
    cursor: "pointer",
  },
  qnt: {
    position: "absolute",
    bottom: "1px",
    right: "-10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    minWidth: "1.2rem",
    padding: "1px 5px",
    borderRadius: "40px",
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#fbb403",
  },
  Hide1: {
    [theme.breakpoints.down("md")]: {
        display: "none",
      },
  },
  Hide: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function DropdownMenu() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);
  const dispatch = useDispatch();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const match = useMediaQuery("(min-width: 960px)");
  const classes = useStyles();
  const toggleCart = () => {
    const action = getShowCart(true);
     dispatch(action);
  };

  const renderMenu = (
    <Box
      display="flex"
      flexDirection={match ? "row" : "column"}
      alignItems="center"
      m={match ? 0 : 1}
      minWidth={match ? 0 : 180}
    >
      <Box m={match ? 0 : 1} className={classes.Hide1}>
        <div className={classes.cart} onClick={toggleCart}>
            <ShoppingCartIcon style={{fontSize: "2rem", color: "#47B5FF"}}/>
            <div className={classes.qnt}>0</div>
        </div>
      </Box>
      
      <Box flexDirection="column" className={classes.Hide}>
        <ul style={{ listStyleType: "none", textAlign: "center"}}>
          <li>
                <div className={classes.cart} onClick={toggleCart}>
                    <ShoppingCartIcon style={{fontSize: "1.2rem", color: "#47B5FF", paddingTop: "5px"}}/>
                     Cart
                </div>
          </li>
          <li>
            <a
              href="/shop"
              className={classes.button}
              style={{ textDecoration: "none" }}
            >
              <div className={classes.cart} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                 <LocalMallOutlinedIcon style={{fontSize: "1.2rem", color: "#47B5FF", paddingTop: "5px"}}/>
                 Shop
              </div>
            </a>
          </li>
        </ul>
      </Box>
      <Box m={match ? 0 : 1}>
        <DarkmodeButton />
      </Box>
      <ButtonGroup disableElevation variant="contained" size="medium">
        <Button
          color="primary"
          //   component={Link}
          //   to={"/sign-in"}
          className={classes.buttonLogIn}
        >
          Sign in
        </Button>
        <Button
          variant="outlined"
          //   coponent={Link}
          //   to={"/sign-up"}
          className={classes.buttonSignUp}
        >
          Sign Up
        </Button>
      </ButtonGroup>
    </Box>
  );
  return (
    <>
      <div className={classes.sectionDesktop}>{renderMenu}</div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls="menu-mobile"
          aria-haspopup="true"
          onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <MoreIcon className={classes.moreIcon} />
        </IconButton>
      </div>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        id="menu-mobile"
        keepMounted
        open={isMobileMenuOpen}
        onClose={() => setMobileMoreAnchorEl(false)}
      >
        {renderMenu}
      </Menu>
      <Cart />
    </>
  );
}

export default DropdownMenu;
