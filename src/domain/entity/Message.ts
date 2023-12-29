export class Message {
    constructor(readonly type: MessageType, readonly content: any, readonly date: Date) { }

    getContent(): any {
        return {
            origin: this.type,
            content: this.content,
            sentAt: this.date
        }
    }
}

type MessageType = "topic" | "direct" | "fanout";