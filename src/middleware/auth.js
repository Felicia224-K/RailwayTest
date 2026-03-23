const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer"))
        return res.status(401).json({ success: false, error:"Token manquant"});

    const token = authHeader.split(" ")[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();

    }
    catch (err) {
        res.status(401).json({ success: false, error: "Token invalid ou expired"});
    }
};

module.exports = authenticate;