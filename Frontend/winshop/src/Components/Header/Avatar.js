import React from 'react';
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadges = withStyles((theme) =>({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation: "$ripple 1.2s infinite ease-in-out",
          border: "1px solid currentColor",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    container:{
        display: "flex"
    }
}))
const AvatarItem = () => {
  const classes = useStyles();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div className={classes.container}>
        <StyledBadges
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar alt="Avatar" src={userInfo.profilePic ? userInfo.profilePic : "https://i.pravatar.cc/150?img=56"} />
        </StyledBadges>
    </div>
  )
}

export default AvatarItem