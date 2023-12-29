import { ProduceMessageInputDto, ProduceMessageUseCase } from "../../application/ProduceMessageUseCase";
import { Http } from "../http/Http";
import { Queue } from "../queue/Queue";

export class MessagesDirectController {
    constructor(http: Http, queue: Queue) {
        http.on("POST", "/messages/direct", async (params, body) => {
            const produceMessage = new ProduceMessageUseCase(queue);
            const input: ProduceMessageInputDto = {
                origin: "direct",
                content: body.content,
                name: params.name,
                date: body.date ?? new Date()
            };
            await produceMessage.execute(input);
            return {
                status: 201,
                data: {
                    "message": "message sent"
                }
            }
        });
    }
}