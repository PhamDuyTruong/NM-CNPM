import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Grid, Box } from "@material-ui/core";
import { GmailTabs, GmailTabItem } from "@mui-treasury/components/tabs/gmail";
import { makeStyles } from "@material-ui/core/styles";
import SkeletonCard from './SkeletonCard';
import ProductsCarousel from './ProductsCarousel'

import {getProductByCategory} from '../../../../actions/ProductCategoryAction'

const useStyles = makeStyles((theme) => ({
    gmailTabs: {
      backgroundColor: "#fff",
    },
    wrapper: {
      color: "#42a5f5 !important",
      fontSize: "1.2rem !important",
      textTransform: "uppercase !important"
    },
    container: {
      overflowX: "hidden"
    }
  }));


  function TabPanel({children, tabNum, index, ...other}){
    return(
      <div 
        role="tabpanel"
        hidden={tabNum !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
          {tabNum === index && <Box p={3}>{children}</Box>}
      </div>
    )
};

function a11yProps(index) {
return {
  id: `scrollable-force-tab-${index}`,
  "aria-controls": `scrollable-force-tabpanel-${index}`,
};
}

const categories = [
  {
    id: 1,
    category: "clothes",
  },
  {
    id: 2,
    category: "books",
  },
  {
    id: 3,
    category: "accessories"
  }
]
  

function Products() {
    const classes = useStyles();
    const [tabNum, setTabNum] = useState(0);
    const {productByCategory, isLoading} = useSelector((state) => state.getProductsByCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductByCategory("clothes"));
    }, [getProductByCategory]);

    const onFetchProduct = (cat) => {
        dispatch(getProductByCategory(cat));
    };

    const handleChange = (_, newValue) => {
        setTabNum(newValue);
        onFetchProduct(categories[newValue].category);
    }
    let productsRender = <SkeletonCard />;
    if(!isLoading){
        productsRender = categories.map((tab, index) => (
            <TabPanel tabNum={tabNum} index={index} key={tab.id}>
                <Grid container justifyContent='center' spacing={2}>
                    <ProductsCarousel productList={productByCategory}/>
                </Grid>
            </TabPanel>
        ))
    }
  return (
    <>
      <h2 style={{color: "#000", fontWeight: "bold", paddingLeft: "10px", textAlign: "center"}}>Your Recomendation</h2>
      <Grid container justifyContent='center' className={classes.container}>
         <GmailTabs
            value={tabNum}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            aria-label="scrollable force tabs"
            className={classes.gmailTabs}
         >
            {categories.map((item, index) =>{
              return (
              <GmailTabItem
                key={index}
                label={item.category}
                classes={{ wrapper: classes.wrapper }}
                {...a11yProps(index)}
              />
              )
            })}
         </GmailTabs>
         {productsRender}
      </Grid>
    </>
  )
}

export default Products