import React, {useEffect} from 'react';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import {useSelector, useDispatch} from 'react-redux'
import "./styles.css"

function AdminFeature({orders, products}) {
    let totalAmount = 0;
    orders.forEach(item => {
        totalAmount += item.totalPrice
    });
    totalAmount = totalAmount.toFixed(2)
    let Rentarget = 600, proTarget = 50, orderTarget = 40;
    let Renpercent = (totalAmount - Rentarget) / 100 ;
    let productsPercent = (products.length - proTarget) / 100;
    let orderPercent = (orders.length - orderTarget) / 100;
  return (
    <div className="featured">
    <div className="featuredItem">
      <span className="featuredTitle">Revenue</span>
      <div className="featuredMoneyContainer">
        <span className="featuredMoney">${totalAmount}</span>
        <span className="featuredMoneyRate">
            {Renpercent.toFixed(2)} 
          {Renpercent > 0 ? <ArrowUpward className="featuredIcon"/> : <ArrowDownward  className="featuredIcon negative"/>} 
        </span>
      </div>
      <span className="featuredSub">Compared to target</span>
    </div>
    <div className="featuredItem">
      <span className="featuredTitle">Products</span>
      <div className="featuredMoneyContainer">
        <span className="featuredMoney">{products.length}</span>
        <span className="featuredMoneyRate">
         {productsPercent}
        { productsPercent  > 0 ? <ArrowUpward className="featuredIcon"/> : <ArrowDownward  className="featuredIcon negative"/>}
        </span>
      </div>
      <span className="featuredSub">Compared to target</span>
    </div>
    <div className="featuredItem">
      <span className="featuredTitle">Orders</span>
      <div className="featuredMoneyContainer">
        <span className="featuredMoney">{orders.length}</span>
        <span className="featuredMoneyRate">
        {orderPercent}
        { orderPercent  > 0 ? <ArrowUpward className="featuredIcon"/> : <ArrowDownward  className="featuredIcon negative"/>}
        </span>
      </div>
      <span className="featuredSub">Compared to target</span>
    </div>
  </div>
  )
}
export default  AdminFeature