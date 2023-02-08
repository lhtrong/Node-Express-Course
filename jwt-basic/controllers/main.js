require('dotenv').config();
const { CustomAPIError, BadRequestError, UnAuthenticatedError } = require('../errors/index');
const jwt = require('jsonwebtoken');
const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError('Please enter both a username and password');
    }
    const id = Date.now()
    const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(200).json({ msg: 'user created', token: token })

}
const dashboard = (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hi ${req.user.username}, here is your data`, secret: `Here is your lucky number: ${luckyNumber}` })
}
module.exports = { login, dashboard }