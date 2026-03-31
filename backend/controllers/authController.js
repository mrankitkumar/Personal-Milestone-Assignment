const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendResponse = require('../utils/responseHelper');

// @desc Auth user & get token
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        sendResponse(res, 200, 'Login successful', {
            _id: user._id,
            email: user.email,
            name: user.name,
            focusGrade: user.focusGrade,
            status: user.status,
            token: generateToken(user._id)
        });
    } else {
        sendResponse(res, 401, 'Invalid email or password');
    }
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
        return sendResponse(res, 400, 'Please provide email and password');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return sendResponse(res, 400, 'User already exists');
    }

    const user = await User.create({
        email,
        password,
        name: name || email.split('@')[0]
    });

    if (user) {
        sendResponse(res, 201, 'User registered successfully', {
            _id: user._id,
            email: user.email,
            name: user.name,
            focusGrade: user.focusGrade,
            status: user.status,
            token: generateToken(user._id)
        });
    } else {
        sendResponse(res, 400, 'Invalid user data');
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports = { loginUser, registerUser };
