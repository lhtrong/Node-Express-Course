require('dotenv').config();

// Async error
require('express-async-errors');

const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const connectDB = require('./db/connect');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.json());


// Route 
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href = "/api/v1/products">Products Store</a>')
})

app.use('/api/v1/products', productsRouter)

app.use(errorMiddleware);

// Product route
const port = process.env.PORT || 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);

        app.listen(port, console.log(`App is listening on ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start();