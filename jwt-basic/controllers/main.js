require('dotenv').config();
const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');
const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new CustomAPIError('Please enter both a username and password', 401);
    }
    const id = Date.now()
    const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(200).json({ msg: 'user created', token: token })

}
const dashboard = (req, res) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401);
    }
    try {

        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const luckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json({ msg: `Hi ${decoded.username}, here is your data`, secret: `Here is your lucky number: ${luckyNumber}` })
    } catch (error) {
        // throw new CustomAPIError('No authorization to access', 401);
        res.json({ msg: error.message })

    }

}
module.exports = { login, dashboard }