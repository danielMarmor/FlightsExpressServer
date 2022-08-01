const logger = require('../log/logger');

const logError =(err, req, res, next)=>{
    if (err){
        logger.error(err);
    }
    next();
}

module.exports = {logError};