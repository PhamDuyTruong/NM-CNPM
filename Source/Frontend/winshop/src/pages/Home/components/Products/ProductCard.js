import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {Link} from 'react-router-dom'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";

import { Favorite, Share, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container:{
      width: 200,
  },
  title:{
      height: 70
  },
  media:{
      height: 0,
      paddingTop: "56.25%",
  },
  expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
  },
  openExpand: {
      transform: "rotate(180deg)"
  },
}))

function ProductCard({product}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () =>{
      setExpanded(!expanded);
  }
  return (
    <Card className={classes.container}>
    <CardActionArea component={Link} to={`/shop/${product._id}`}>
       <CardMedia className={classes.media} image={product.image} title={product.name}/>
      <CardContent>
         <Typography className={classes.title} gutterBottom variant='subtitle2' component="h5">
                {product.name}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
           Price: ${product.price} 
         </Typography>
       </CardContent>
    </CardActionArea>

    <CardActions disableSpacing>
    <IconButton aria-label="share">
      <Share />
    </IconButton>
    <IconButton aria-label="favorites">
      <Favorite />
    </IconButton>
    <IconButton
      className={clsx(classes.expand, {
        [classes.expandOpen]: expanded,
      })}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMore />
    </IconButton>
  </CardActions>
  
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <Typography paragraph variant="body2">
        Desciption: {product.description}
      </Typography>
    </CardContent>
  </Collapse>
</Card>
  )
}

export default ProductCard