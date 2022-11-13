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
    },
    createProductReview: async(req, res) => {
        const {rating, comment} = req.body;
        const product = await Product.findById(req.params.id);
        if(product){
            const alreadyReview = product.reviews.find(
                (r) => r.user.toString() === req.user.id.toString()
              );
            if(alreadyReview){
                res.status(400).json("Product already reviewed !!!");
            }
            const review = {
                user: req.user.id,
                name: req.user.username,
                rating: Number(rating),
                comment: comment
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.ratings =product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            try {
                const updatedProduct = await product.save();
                res.status(200).json(updatedProduct);
            } catch (error) {
                res.status(500).json(error)
            }
        }else {
            res.status(404).json("Product not found !!!");
        }
     
      
    }
};

module.exports = productControllers;