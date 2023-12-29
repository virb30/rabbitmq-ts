import { Message } from "../domain/entity/Message";
import { Queue } from "../infra/queue/Queue";

export class ProduceMessageUseCase {

    types = {
        direct: "directExchange",
        topic: "topicExchange",
        fanout: "fanoutExchange"
    }

    constructor(private queue: Queue) {

    }

    async execute(input: ProduceMessageInputDto): Promise<void> {
        const message = new Message(input.origin, input.content, input.date);
        const exchangeName = this.types[input.origin] ?? this.types.fanout;
        await this.queue.publish(exchangeName, input.name, message.getContent());
    }
}

export type ProduceMessageInputDto = {
    origin: "topic" | "direct" | "fanout";
    name: string;
    content: string;
    date: Date;
}