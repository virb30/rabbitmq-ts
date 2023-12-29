import { Consumer1Handler } from "../handler/Consumer1Handler";
import { Queue } from "../queue/Queue";

export class Consumer1Controller {
    constructor(queue: Queue) {
        queue.consume("fila1", async function (msg: any) {
            const handler = new Consumer1Handler();
            await handler.handle(msg);
        })
    }
}