require('dotenv').config();

const Product = require('./models/product');
const connectDB = require('./db/connect');
const ProductList = require('./products')

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany()
        await Product.create(ProductList);
        console.log("Sucessfully ")
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
}

start();