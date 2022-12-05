import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import "./styles.scss";
import {getProductDetail} from '../../actions/DetailProductAction';
import HandleImage from '../../utils/HandleImage';
import bannerImg from '../../assets/images/banner_detail.jpg';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';

import DetailMain from './DetailMain';
import DetailImage from './DetailImage'
import DetailReview from './DetailReview';

function DetailProduct() {
    const {detailProduct, isLoading} = useSelector((state) => state.getDetailProduct);
    const {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductDetail(id));
    }, [getProductDetail, id])
    
  return (
    <div className='detail'>
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