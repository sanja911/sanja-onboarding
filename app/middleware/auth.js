const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    isAuthenticated: function (req, res, next) {
    const token = req.headers['x-access-token']
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded)=>{
    if (!token) {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, config.JWT_SECRET, (err, decoded,result)=>{
                if (err) {
                    console.log(err, "error")
                    res.status(401).send({ err: err, result: result, });
                } else {
                    req.name = decoded.name;
                    req.username = decoded.name;
                    res.locals.user = decoded
                    next();
                }
            });
        }
    })
    }
   
};