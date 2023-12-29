import { Consumer2Handler } from "../handler/Consumer2Handler";
import { Queue } from "../queue/Queue";

export class Consumer2Controller {
    constructor(queue: Queue) {
        queue.consume("fila.logs", async function (msg: any) {
            const handler = new Consumer2Handler();
            await handler.handle(msg);
        })
    }
}