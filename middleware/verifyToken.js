const JWT = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    const token = req.header("auth-token");

    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "Access denied" });

    try {
        const verify = JWT.verify(token, process.env.TOKEN_SECRET);
        res.user = verify;

        next();
    } catch (err) {
        res.status(400).json({ success: false, message: "Invalid token" });
    }
}

module.exports = verifyJWT;
