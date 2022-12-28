import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";

function useTotalPrice() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    const {cartItems} = useSelector((state) => state.cart);

    useEffect(() =>{
        const totalPrice = cartItems.reduce((acc, item) => acc + item.qnt * item.price, 0);
        const totalQnt = cartItems.reduce((acc, item) => acc + item.qnt, 0);
        const fixedTotalPrice = (
            totalPrice * (totalQnt >= 5 ? 0.6 : totalQnt >= 3 ? 0.75 : totalPrice ? 0.85 : 1)
        ).toFixed(2);

        setTotalPrice(fixedTotalPrice);
        setDiscount((totalPrice - Number(fixedTotalPrice)).toFixed(2));
    }, [cartItems]);

    return {totalPrice, discount}; 
};

export default useTotalPrice;