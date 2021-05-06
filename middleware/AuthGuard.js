const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        if (accessToken && accessToken.trim() !== '') {

            req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY)
            next();
        } else {
            res.status(403).json('json token error')
        }
    } catch (error) {
        if (error.name == 'TokenExpiredError')
            res.status(401).json('Auth failed')
        else
            res.status(403).json('json token error')
    }
}