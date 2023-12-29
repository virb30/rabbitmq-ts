import { Consumer1Controller } from "./infra/controller/Consumer1Controller";
import { Consumer2Controller } from "./infra/controller/Consumer2Controller";
import { MessagesDirectController } from "./infra/controller/MessagesDirectController";
import { MessagesFanoutController } from "./infra/controller/MessagesFanoutController";
import { MessagesTopicController } from "./infra/controller/MessagesTopicController";
import { ExpressHttpAdapter } from "./infra/http/ExpressHttpAdapter";
import { RabbitMQQueueAdapter } from "./infra/queue/RabbitMQQueueAdapter";

const http = new ExpressHttpAdapter();
const queue = new RabbitMQQueueAdapter("amq.direct");

queue.connect().then(() => {
    new MessagesDirectController(http, queue);
    new MessagesFanoutController(http, queue);
    new MessagesTopicController(http, queue);
    new Consumer1Controller(queue);
    new Consumer2Controller(queue);
})


http.listen(3001);