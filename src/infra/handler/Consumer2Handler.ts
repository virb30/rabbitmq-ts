export class Consumer2Handler {
    async handle(message: any) {
        console.log(`consumer-2|${message.sentAt}|${(new Date()).toISOString()}|${message.origin}|${message.content}`);
    }
}