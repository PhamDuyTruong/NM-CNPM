import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../../../services/axiosClient";
import "./style.css";
import AdminWidget from '../AdminWidget'
import AdminFeature from '../AdminFeature';
import Chart from '../Chart';
import {userData} from '../../../utils/userData'

function Dashboard() {
  const orders = useSelector((state) => state.AdminOrder);
  const users = useSelector((state) => state.AdminUser);
  const products = useSelector((state) => state.AdminProduct);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosClient.get("/api/order/admin");
      dispatch({ type: "ADMIN_ORDER_UPDATE", payload: data.data.orders });
      const dataUser = await axiosClient.get("/api/user/admin");
      dispatch({ type: "USER_UPDATE", payload: dataUser.data });
      const dataProduct = await axiosClient.get("/api/product");
      dispatch({ type: "ADMIN_PRODUCT_UPDATE", payload: dataProduct.data });
    };
    fetchData();
  }, []);
  return (
    <>
         <div className="dashboard">
        <div className="widget">
          <AdminWidget
            title="USERS"
            value={users.length}
            detail="See all users"
            url="/admin/users"
          ></AdminWidget>
          <AdminWidget
            title="ORDERS"
            value={orders.length}
            detail="See all orders"
            url="/admin/orders"
          ></AdminWidget>
          <AdminWidget
            title="PRODUCTS"
            value={products.length}
            detail="See all products"
            url="/admin/products"
          ></AdminWidget>
        </div>
        <AdminFeature orders={orders} products={products}/>
        <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      </div>
    </>
  )
}

export default Dashboard