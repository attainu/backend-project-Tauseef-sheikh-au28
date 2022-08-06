const jwt = require('jsonwebtoken');
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
module.exports = {
    Auth_LOGIN: (req, res, next) => {
        verify(req, res, next, 'login');
    },
    Auth_ACCESS: (req, res, next) => {
        verify(req, res, next, 'access');
    }
};
const verify = (req, res, next, type) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).send({ message: 'Access Denied' });

    }
    //Validate auth header is exists
    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        console.log('TOKEN not exists');
        return res.status(401).send({ message: 'Access Denied' });
    }
    let decodedToken;
    try {
        if (type == 'access') {
            decodedToken = jwt.verify(token, JWT_AUTH_TOKEN);
        } else {
            decodedToken = jwt.verify(token, JWT_REFRESH_TOKEN);
        }
    } catch (error) {
        return res.status(401).send({ message: 'Access Denied,Invalid Token' });
    }
    if (!decodedToken) {
        return res.sendStatus(403);
    }
    req.isAuth = true;
    req.loggedData = decodedToken;

    if (typeof req.loggedData.user_id === 'undefined' || req.loggedData.user_id === '' || isNaN(req.loggedData.user_id) === true ) {
        return res.status(401).json({
            message: 'Access Denied'
        });
    }
    next();
}