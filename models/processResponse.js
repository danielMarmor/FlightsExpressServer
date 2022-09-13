const jwt = require('jsonwebtoken');
const config= require('../config/config');

//AUTH
const maxAge = 3 * 24 * 60 * 60;
const createToken = (encodedBody) => {
  return jwt.sign({ encodedBody }, config.authentication.secretKey, {
    expiresIn: maxAge
  });
};

module.exports.processGet =(req, res, responseData)=>{
    const {exception, payload, server_internal_error} = responseData;
    if (server_internal_error){
        res.status(501).send("Internal Server Error");
        return;
    }
    if (exception){
        res.status(401).send(exception);
        return;
    }
    if (payload){
        res.status(200).send(payload);
        return;
    }
    res.status(501).send('Internal Server Error');
    return;
}

module.exports.processPost =(req, res, responseData)=>{
    const {exception, payload, server_internal_error} = responseData;
    if (server_internal_error){
        res.status(501).send("Internal Server Error");
        return;
    }
    if (exception){
        res.status(401).send(exception);
        return;
    }
    if (payload){
        res.status(201).send(payload);
        return;
    }
    res.status(501).send('Internal Server Error');
    return;
}

module.exports.processPut =(req, res, responseData)=>{
    const {exception, payload, server_internal_error} = responseData;
    if (server_internal_error){
        res.status(501).send("Internal Server Error");
        return;
    }
    if (exception){
        res.status(401).send(exception);
        return;
    }
    if (payload){
        const {success} = payload;
        if (success){
            res.status(204).send('Commited Succesfuly!');
            return;
        }
        res.status(501).send("Internal Server Error");
        return;
   
    }  
    res.status(501).send("Internal Server Error");
    return;
}

module.exports.processDelete =(req, res, responseData)=>{
    const {exception, payload, server_internal_error} = responseData;
    if (server_internal_error){
        res.status(501).send("Internal Server Error");
        return;
    }
    if (exception){
        res.status(401).send(exception);
        return;
    }
    if (payload){
        const {success} = payload;
        if (success){
            res.status(204).send('Commited Succesfuly!');
            return;
        }
        res.status(501).send("Internal Server Error");
        return;
   
    }  
    res.status(501).send("Internal Server Error");
    return;
}

module.exports.processLogin =(req, res, responseData)=>{
    const {exception, payload, server_internal_error} = responseData;
    if (server_internal_error){
        res.status(501).send("Internal Server Error");
        return;
    }
    if (exception){//UNAUTHORIED
        res.status(404).send(exception);
        return;
    }
    if (payload){
        const {token} = payload;
        const encodedToken = createToken(token);
        res.cookie('jwt', encodedToken,  { httpOnly: true, maxAge: maxAge * 1000 });
        // res.cookie('jwt', encodedToken, { httpOnly: false, maxAge: maxAge * 1000, sameSite: 'None', secure: true});
        // res.writeHead(201, npx{
        //     "Set-Cookie": `mycookie=test`,
        //     "Content-Type": `text/plain`
        // });
        res.status(201).json({ payload });
        return;
    }
    res.status(501).send('Internal Server Error');
    return;
    
}