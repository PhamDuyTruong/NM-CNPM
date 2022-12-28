const Order = require("../models/Order");
const Product = require("../models/Product");

const orderControllers = {
    createOrder: async(req, res) => {
        const {
            shippingInfo,
            cart,
            paymentMethod,
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
                paymentMethod,
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
    },
    getMyOrders: async(req, res) => {
        try {
            const orders = await Order.find({user: req.user.id});
            if(!orders){
                return res.status(404).json("Orders not found !!!");
            }
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllOrders: async(req, res) => {
        try {
            const orders = await Order.find();
            let totalAmount = 0;
            orders.forEach((order) => {
                totalAmount += order.totalPrice;
            });

            res.status(200).json({orders, totalAmount});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateStock: async(id, quantity) => {
        const product = await Product.findById(id);
        if(!product.countInStock){
            product.countInStock = -1;
        }
        product.countInStock -= quantity;
        await product.save();
    },

    updateOrderByStatus: async(req, res) => {
        try {
            const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json("Order not found !!!");
        }
        if(order.orderStatus === "Shipped"){
            return res.status(400).json("You have already delivered this order");
        }
        if(req.body.status === "Delivering"){
            order.cart.forEach(async (o) => {
                await orderControllers.updateStock(o.product, o.qnt)
            })
        }
        order.orderStatus = req.body.status;
        if (req.body.status === "Shipped") {
            order.isDelevered = true;
            order.deliveredAt = Date.now();
        }
        await order.save();
        res.status(200).json(order);

        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateOrderToPaid: async(req,res)=>{
        const order = await Order.findById(req.params.id)
   
        if(order){
           order.paidAt = Date.now()
           order.paymentInfo = {
               id:req.body.id,
               status:req.body.status,
               update_time:req.body.update_time,
               email_address:req.body.email_address
           }
           const updatedOrder = await order.save()
   
           res.json(updatedOrder)
        }else{
            res.status(404)
            throw new Error('Order Not Found')
        }
   },
    updateOrder: async(req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if(!order){
                return res.status(404).json("Order not found !!!");
            }
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    itemsPrice: req.body.itemsPrice,
                    shippingPrice: req.body.shippingPrice,
                    taxPrice: req.body.taxPrice,
                    orderStatus: req.body.orderStatus  
                },
                {new: true}
            );
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteOrder: async(req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if(!order){
                return res.status(404).json("Order not found !!!");
            }
            await order.remove();
            res.status(200).json({
                message: "Order has been deleted"
            })
        } catch (error) {
            res.status(500).json(error);
        }
    }
        
};

module.exports = orderControllers;