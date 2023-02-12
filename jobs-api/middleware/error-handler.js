const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again'
    }
    if (err.name === 'ValidationError') {
        customError.status = 400;
        customError.msg = Object.values(err.errors).map((item) => item.message).join(', ');
    }
    if (err.name === 'CastError') {
        customError.status = 404;
        customError.msg = `Not found with id: ${err.value}`;
    }

    if (err.code && err.code === 11000) {

        customError.statusCode = 400;
        customError.msg = `Duplicate value for entered for ${Object.keys(err.keyValue)}, please try another value`;
    }
    // return res.status(500).json({ msg: err });
    return res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandlerMiddleware