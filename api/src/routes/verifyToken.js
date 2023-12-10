const jwt = require('jsonwebtoken');

require('dotenv').config();

const { SECRET_KEY } = process.env;


async function verifyToken(req, res, next) {

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({ auth: false })
    }

    const payload = jwt.verify(token, SECRET_KEY)
    
    req.userId = payload._id;

    next();
}

module.exports = verifyToken