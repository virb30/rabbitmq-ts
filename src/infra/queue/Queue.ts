export interface Queue {
    connect(): Promise<void>;
    close(): Promise<void>;
    publish(exchangeName: string, queue: string, payload: any): Promise<void>;
    consume(queue: string, callback: any): Promise<void>;
    sendToQueue(queue: string, payload: any): Promise<void>;
}