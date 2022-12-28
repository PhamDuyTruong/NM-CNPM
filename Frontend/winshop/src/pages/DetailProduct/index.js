import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import "./styles.scss";
import {getProductDetail} from '../../actions/DetailProductAction';
import HandleImage from '../../utils/HandleImage';
import bannerImg from '../../assets/images/banner_detail.jpg';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import DetailMain from './DetailMain';
import DetailImage from './DetailImage'
import DetailReview from './DetailReview';

function DetailProduct() {
    const {id} = useParams();
    const {detailProduct, isLoading} = useSelector((state) => state.getDetailProduct);
    const {darkTheme} = useSelector((state) => state.sidebar);
    const ThemeInLocal = JSON.parse(localStorage.getItem("theme"))
    let isTheme = darkTheme;
    if(!darkTheme){
        isTheme = ThemeInLocal
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductDetail(id));
    }, [getProductDetail, id])

    if (isLoading) {
        return (
          <div className='spinner'>
            <CircularProgress thickness={5} style={{ color: "#E84C51"}} />
          </div>
        );
      }
    
  return (
    <div className='detail' style={{background: `${isTheme ? "#1A120B" : ""}`, color: `${isTheme ? "#fff": ""}`}}>
        <section className='banner'>
          <img src={HandleImage(bannerImg)} alt="Hinh anh" style={{marginTop: "3.5rem"}} width="100%" height="200"/>
       </section>
       <Container>
            <section className='detail__container'>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <DetailImage product={detailProduct}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                          <DetailMain product={detailProduct}/>
                    </Grid>
                </Grid>
            </section>
            <DetailReview />
        </Container>
    </div>
  )
}

export default DetailProduct