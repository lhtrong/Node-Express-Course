require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs');
const authMiddleware = require('./middleware/authentication')

const connectDB = require('./db/connect');

// Extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss');
const rateLimiter = require('express-rate-limiter');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// extra packages

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', authMiddleware, jobsRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();