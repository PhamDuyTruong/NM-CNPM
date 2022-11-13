const Order = require("../models/Order");
const User = require("../models/User");

const orderControllers = {
    createOrder: async(req, res) => {
        const {
            shippingInfo,
            cart,
            paymentInfo,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        } = req.body
        try {
            const order = await Order({
                shippingInfo,
                cart,
                user: req.user.id,
                paymentInfo,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                paidAt: Date.now()
            });
            const newOrder = await order.save();
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getOrderById: async(req, res) => {
      
        try {
            const order = await Order.findById(req.params.id).populate('user', 'name email');
            if(!order){
                return res.status(404).json("Order not found !!!");
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = orderControllers;