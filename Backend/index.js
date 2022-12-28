const express = require("express");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");
const productRouter = require("./routers/products");
const orderRouter = require("./routers/orders");

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
const publicPath = path.join(__dirname, "./public");
app.use("/public", express.static(publicPath));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 5000;
const URI = process.env.DB_URL;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    })
}).catch(err=> {
    console.log('Error: ', err)
});

