const jwt = require('jsonwebtoken');
const { jwt: jwtKey } = require('../config/keys');

module.exports = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw '';
            }

            const tokenData = jwt.verify(token, jwtKey);
            const { role: userRole, userID } = tokenData;
            req.user = tokenData;
            
            let hasRole = false;

            if (roles.includes(userRole)){
               hasRole = true;
            } else {
                throw '';
            }
            next();

        } catch (err) {
            console.log(err);
            return res.json({
                massage: 'Вы не авторизировались'
            });            
        }
    };
};