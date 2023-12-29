export class Consumer1Handler {
    async handle(message: any) {
        console.log(`consumer-1|${message.sentAt}|${(new Date()).toISOString()}|${message.origin}|${message.content}`);
    }
}