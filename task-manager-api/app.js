const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
// Middleware
app.use(express.json());

// Route

app.get('/hello', (req, res) => {
    res.send("Hello, It's Task Manager App!");
});

app.use('/api/v1/tasks', tasks);



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