const config = {
    app :{
        port : 8080
    },
    rabbit :{
        host: 'amqp://localhost:5672',
        readOnlyQueue : 'READONLY',
        writeQueue : 'WRITE',
        responseQueue : 'RESPONSE'
    },
    authentication: {
        secretKey :'secret-key'
    },
    images :{
        personImageDeafultURL :'https://i.stack.imgur.com/l60Hf.png',
        iconImageDefaultURL : 'upload.wikimedia.org/wikipedia/commons/0/0a/Antu_application-default-icon.svg'
    }
}
module.exports = config;