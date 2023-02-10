const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs');
const { BadRequestError, UnauthenticatedError } = require('../errors/index')
const register = async(req, res) => {
    try {
        const user = await User.create({...req.body })
        const token = await user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token: token });
    } catch (error) {
        res.json({ error: error })
    }

};
const login = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide both email and password');
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const isMatch = await user.comparePassword(password);
    console.log(await user.comparePassword);
    if (!isMatch) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    //Compare password
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token: token });

};


module.exports = {
    login,
    register
}