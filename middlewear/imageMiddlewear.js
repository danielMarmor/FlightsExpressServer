const config = require('../config/config');

const requirePersonImage  = (req, res, next)=>{
    const image_url = req.body.image_url;
    if (!image_url){
        req.body.image_url =config.images.personImageDeafultURL; 
    }
    next()
}

const requireIconImage  = (req, res, next)=>{
    const image_url = req.body.image_url;
    if (!image_url){
        req.body.image_url =config.images.iconImageDefaultURL; 
    }
    next()
}

module.exports = {requirePersonImage, requireIconImage}