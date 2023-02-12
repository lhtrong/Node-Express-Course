const {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
} = require('../errors/index');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();
require('express-async-errors')

const authMiddleware = async(req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Invalid authorizatio');
    }
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const { userID, name } = decoded;
    req.user = { userID, name };
    next();

};


module.exports = authMiddleware;