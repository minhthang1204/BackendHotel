require('dotenv').config();
const jwt = require('jsonwebtoken');
const http = require('../constants/http');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == 'null') {
        res.status(http.FORBIDDEN);
        return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, res) => {
        if (err) {
            res.status(http.UNAUTHORISED);
            return;
        };
        next();
    });
}

module.exports = authenticateToken;
