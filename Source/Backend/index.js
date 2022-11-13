const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");
const productRouter = require("./routers/products");

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

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

