import { Queue } from "./Queue";
import amqp from "amqplib";

export class RabbitMQQueueAdapter implements Queue {

    connection: amqp.Connection | undefined;

    constructor(private exchange: string) {

    }

    async connect(): Promise<void> {
        this.connection = await amqp.connect("amqp://rabbitmq:rabbitmq@rabbit");
    }


    async close(): Promise<void> {
        if (!this.connection) {
            throw new Error("connection closed");
        }
        this.connection.close();
    }

    async publish(exchangeName: string, queue: string, payload: any): Promise<void> {
        if (!this.connection) throw new Error("connection closed");
        const channel = await this.connection.createChannel();
        await channel.checkExchange(this.exchange);
        channel.publish(exchangeName, queue, Buffer.from(JSON.stringify(payload)));
    }

    async sendToQueue(queue: string, payload: any): Promise<void> {
        if (!this.connection) throw new Error("connection closed");
        const channel = await this.connection.createChannel();
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
    }

    async consume(queueName: string, callback: any): Promise<void> {
        if (!this.connection) throw new Error("connection closed");
        const channel = await this.connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        await channel.consume(queueName, async function (msg: any) {
            await callback(JSON.parse(msg.content.toString()));
        }, {
            noAck: true
        });
    }
}