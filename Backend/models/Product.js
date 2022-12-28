const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        maxLength: 8
    },
    image: {
        type: String,
        required: true,
        default: "",
    },
    size: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: ""
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type:String,
        required:true
    },
    ratings: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type:Number,
        required:true,
        default:0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String, 
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    countInStock: {
        type:Number,
        required:true,
        default:0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);