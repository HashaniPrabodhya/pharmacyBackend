// src/middleware/permissions.js

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateRandomKey = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

const secretKey = generateRandomKey(32);

console.log('Secure Random Key:', secretKey);

const checkPermissions = (requiredRole, requiredPermission) => {
    return (req, res, next) => {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized. Token not provided.' });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error(err.message);
                return res.status(401).json({ error: 'Unauthorized. Invalid token.' });
            }

            const { role } = decoded;

            if (role === 'Owner') {
                next();
            } else if (role === 'Manager' && requiredRole !== 'Owner') {
                next();
            } else if (role === 'Cashier' && requiredRole === 'User') {
                next();
            } else {
                res.status(403).json({ error: 'Permission denied' });
            }
        });
    };
};

module.exports = { checkPermissions, secretKey };
