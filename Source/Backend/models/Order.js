const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
});


const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true,
        },
    },
    cart: [cartSchema],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      paymentMethod: {
        type: String,
        required: true
      },
      paymentInfo: {
        id: {
            type: String
        },
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String},
      },
      itemsPrice: {
        type:Number,
        required:true,
        default:0.0,
      },
      shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0
      },
      paidAt: {
        type: Date,
        required: true,
      },
      isDelevered: {
        type:Boolean,
        required:true,
        default:false
    },
    deleveredAt:{
        type:Date
    },
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);