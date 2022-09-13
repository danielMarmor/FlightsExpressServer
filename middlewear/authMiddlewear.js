const jwt =require('jsonwebtoken');
const logger = require('../log/logger');
const config = require('../config/config');

module.exports.requireAuth =(req, res, next)=>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, config.authentication.secretKey, (err, decodedToken)=>{
            if (err){
                res.status(404).send('UnAuthorized!');
            }
            else{
                res.locals.token = decodedToken.encodedBody
                logger.info(decodedToken);
                next();
            }
        });
    }
    else{
        res.status(404).send('UnAuthorized!');
    }
    
}
