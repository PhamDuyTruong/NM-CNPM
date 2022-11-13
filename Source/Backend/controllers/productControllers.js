const Product = require("../models/Product");
const ApiFeature = require("../utils/ApiFeature")

const productControllers = {
    createProduct: async(req, res) => {
        const newProduct = await Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllProducts: async(req, res) => {
        try {
            const productFeature = new ApiFeature(Product.find(), req.query).search().filter();
            const product = await productFeature.query;
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getProductById: async(req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if(!product){
                return res.status(404).json({
                    success: false,
                    message: "Product not found !!!"
                })
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateProduct: async(req, res) => {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found !!!"
            })
        }
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                  },
                  { new: true, runValidators: true }
            );

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteProduct: async(req, res) => {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found !!!"
            })
        }
        try {
            await product.remove();
            res.status(200).json({
                success: true,
                message: "Product has been deleted successfully"
            })
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = productControllers;