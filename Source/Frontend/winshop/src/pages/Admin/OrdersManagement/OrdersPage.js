import React, {useEffect} from 'react';
import OrderBox from "./OrderBox";
import { useSelector, useDispatch } from "react-redux";
import axiosClient from "../../../services/axiosClient";
import "./OrdersPage.css";

function OrdersPage() {
    const dataOrders = useSelector((state) => state.AdminOrder);
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchData = async () => {
        const data = await axiosClient.get("/api/order/admin");
        dispatch({ type: "ADMIN_ORDER_UPDATE", payload: data.data.orders });
      };
      fetchData();
    }, []);
  return (
    <div className="admin-orderspage">
            {dataOrders.map((data, index) => (
              <OrderBox
                price={dataOrders[index].itemsPrice}
                status={dataOrders[index].orderStatus}
                time={dataOrders[index].createAt}
                nums_Of_Product={dataOrders[index].cart.length}
                id={dataOrders[index]._id}
                user_id={dataOrders[index].user}
                key={"orderBox-" + index}
              ></OrderBox>
            ))}
          </div>
  )
}

export default OrdersPage