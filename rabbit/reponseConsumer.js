const amqp = require('amqplib');
const config = require('../config/config');

const host = config.rabbit.host;
const queueName  =config.rabbit.responseQueue;

const logger = require('../log/logger');

const responseConsumer = ()=> {
    this.channel ={};  
};

responseConsumer.connect = async()=>{
    try{
        const connection =await amqp.connect(host);
        this.channel = await connection.createChannel();
        await this.channel.assertQueue(queueName,{durable :false});
    }
    catch(ex){
        logger.error(ex);
    }
};

responseConsumer.consume =(correlationPool)=>{
    this.channel.consume(queueName, (message)=>{
        if (message){
            responseConsumer.onMessageRecieved(message, correlationPool);
        }       
    });
};

responseConsumer.onMessageRecieved =(message, correlationPool)=>{
    const input =JSON.parse(message.content.toString());
    const {correlation_id, payload, exception, server_internal_error} = input;
    const data = {payload, exception, server_internal_error};
    correlationPool.signal(correlation_id, data);
    this.channel.ack(message);
};

module.exports = responseConsumer;