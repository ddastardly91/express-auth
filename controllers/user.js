// Import User model
const User = require("../models/User");

// Import validation
const { registerValidation, loginValidation } = require("../utils/validation");

// Import bcrypt
const bcrypt = require("bcryptjs");

// Import JWT
const JWT = require("jsonwebtoken");

// @desc     - Create a new user
// @route    - POST /api/users/register
// @access   - Public
exports.createUser = async (req, res, next) => {
    // Validate user before creating
    const { error } = registerValidation(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }

    // Hash users password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        res.status(200).json({ success: true, data: user._id });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc     - Log in user
// @route    - POST /api/users/login
// @access   - Public
exports.loginUser = async (req, res, next) => {
    // Validate user before logging in
    const { error } = loginValidation(req.body);

    if (error) {
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });
    }

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });

    // Check if password is correct
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });

    // Create an assign JWT token
    const token = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "30m",
    });
    res.header("auth-token", token);

    res.status(200).json({
        success: true,
        message: `${user.name} has successfully logged in!`,
        token: token,
    });
};
