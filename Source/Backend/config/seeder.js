const dotenv = require("dotenv");
const mongoose = require("mongoose");
const products = require("../data/products");
const Product = require("../models/Product");
dotenv.config();

const URI = process.env.DB_URL;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to DB');
}).catch(err=> {
    console.log('Error: ', err);
    process.exit(1)

});

const importProducts = async() => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Data imported');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
};

switch(process.argv[2]){
    case "-p":
        importProducts();
        break;
    default: 
      break;
}
