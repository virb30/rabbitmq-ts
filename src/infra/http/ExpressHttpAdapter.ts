import { CallbackFunction, Http, HttpMethod } from "./Http";
import express, { Response, type Express, Request, NextFunction } from "express";

export class ExpressHttpAdapter implements Http {

    readonly app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use((_request: Request, response: Response, next: NextFunction) => {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
            next();
        });
    }

    on(method: HttpMethod, uri: string, callback: CallbackFunction): void {
        const routeMethod = method.toLowerCase();
        this.app[routeMethod](uri, async (request: Request, response: Response) => {
            const params = { ...request.params, ...request.query };
            const output = await callback(params, request.body);
            response.status(output.status);
            return response.json(output.data);
        });
    }


    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    }
}