const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errHandler = require('./middleware/error-handler');
// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Route


app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errHandler);


const PORT = process.env.PORT;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
    } catch (error) {
        console.log(error);
    }
};
start();