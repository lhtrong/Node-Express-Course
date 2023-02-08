const { CustomAPIError, BadRequestError, UnAuthenticatedError } = require('../errors/index');
const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        throw new UnAuthenticatedError('No token provided');
    }
    try {

        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const { id, username } = decoded
        req.user = { id, username }
        next();
    } catch (error) {
        throw new UnAuthenticatedError('No authorization to access');
        // res.json({ msg: error.message })

    }
}

module.exports = authMiddleware