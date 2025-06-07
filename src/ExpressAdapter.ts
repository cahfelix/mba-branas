import HttpServer from "./HttpServer";
import express from "express";

/**
 * Adaptador que implementa a interface `HttpServer` usando o framework Express.
 * Responsável por configurar rotas HTTP e iniciar o servidor.
 */
export default class ExpressAdapter implements HttpServer {
    app: any;
    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    // Registra uma rota HTTP no servidor Express.
    on(method: string, url: string, callback: Function): void {
        this.app[method](url, async function (req: any, res: any) {
            const output = await callback(req.params, req.body, req.headers);
            res.json(output);
        });
    }

    // Inicia o servidor na porta especificada.
    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`🚀 Servidor rodando na porta ${port}`);
        });
    }

}
