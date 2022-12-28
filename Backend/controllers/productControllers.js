
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
            const resultPerPage = 12;
            const productsCount = await Product.countDocuments();
            const pages = Math.ceil(productsCount / resultPerPage);
            const apiFeature = new ApiFeature(Product.find(), req.query).search().filter();
            let product = await apiFeature.query;
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchProductByName: async(req, res) => {
        try {
            const search = req.body.keyword || "";
            const product = await Product.find({name: {$regex: ".*"+search+".*", $options: "i"}});
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
        const {
            name,
            description,
            price,
            image,
            brand,
            category,
            countInStock
        } = req.body;
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found !!!"
            })
        }
        try {
            product.name = name;
            product.price = price;
            product.description = description;
            product.image = image;
            product.brand = brand;
            product.category = category;
            product.countInStock = countInStock;
            const updatedProduct = await product.save();
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
        const rating = req.body.rating;
        const comment = req.body.comment
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
                rating: rating,
                comment: comment
            };
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            let avg = 0;

             product.reviews.forEach((rev) => {
                avg += rev.rating;
            });
            if(product.reviews.length > 0){
               product.ratings = avg / product.reviews.length;
            }
            try {
                const updatedProduct = await product.save();
                res.status(200).json(updatedProduct);
            } catch (error) {
                res.status(500).json(error)
            }
        }else {
            res.status(404).json("Product not found !!!");
        }
    },
    getProductReview: async(req, res) => {
        const product = await Product.findById(req.query.id);
        if(!product){
            return res.status(404).json("Product not found !!!");
        }
        res.status(200).json({
            reviews: product.reviews
        })
    },
    deleteReview: async(req, res) => {
        const product = await Product.findById(req.query.productId);
        if(!product){
            return res.status(404).json("Product not found !!!");
        }
        const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
        let avg = 0;
        reviews.forEach((rev) => {
            avg += rev.rating;
        });
        let ratings = 0;

        if (reviews.length === 0) {
          ratings = 0;
        } else {
          ratings = avg / reviews.length;
        }
        const numReviews = reviews.length;
        try {
            await Product.findByIdAndUpdate(
                req.query.productId,
                {
                  reviews,
                  ratings,
                  numReviews,
                },
                {
                  new: true,
                  runValidators: true,
                  useFindAndModify: false,
                }
            );
            res.status(200).json("Review has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    uploadImage: async(req, res) => {
        const {file} = req;
        const urlImage = `http://localhost:5000/${file.path}`;
        try{
          const productFound = await Product.findById(req.params.id)
          if(!productFound){
            return res.status(404).json("Product is not found !!!");
         }
          productFound.image = urlImage;
          await productFound.save();
          res.status(200).json(productFound);
        }catch(error){
            res.status(500).json(error);
         }
    }
};

module.exports = productControllers;