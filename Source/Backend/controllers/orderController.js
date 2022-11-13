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
    }
};

module.exports = orderControllers;