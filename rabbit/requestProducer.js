const amqp = require('amqplib');
const config = require('../config/config');

const host = config.rabbit.host;

const queueReadOnly= config.rabbit.readOnlyQueue;
const queueWrite =config.rabbit.writeQueue;

const logger = require('../log/logger');

const producer = ()=>{
    this.channel ={}
};

producer.connect = async()=>{
    try{
        const connection =await amqp.connect(host);
        this.channel = await connection.createChannel();
        //await this.channel.deleteQueue(queueReadOnly);
        //await this.channel.deleteQueue(queueWrite);
        await this.channel.assertQueue(queueReadOnly, {durable :false});
        await this.channel.assertQueue(queueWrite, {durable :false});
    }
    catch(ex){
        logger.error(ex);
    }
};

producer.publish= async(reqQueueName, message)=>{
    try{
        const msgBuffer=  Buffer.from(JSON.stringify(message))
        this.channel.sendToQueue(reqQueueName, msgBuffer);
        logger.info(`Message Sent : ${message}`);
    }
    catch(ex){
        logger.error(ex);
    }
};

module.exports = producer;