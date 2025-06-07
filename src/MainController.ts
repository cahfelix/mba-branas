import HttpServer from "./HttpServer";
import UseCase from "./UseCase";

/**
 * Controlador principal responsável por conectar rotas HTTP com casos de uso da aplicação.
 * Atua como um "driver" que extrai os dados do request e encaminha para o serviço adequado.
 */
export default class MainController {
    // Cria uma nova instância do controlador principal, httpServer vai permitir mapear uma rota especifica
    constructor(
        readonly httpServer: HttpServer,
        readonly useCase: UseCase) 
    {
        /**
         * Registra uma rota POST em `/generate_invoices` no servidor HTTP.
         * Extrai os dados do corpo da requisição (`body`) e adiciona informações do cabeçalho (`headers`)
         * como `user-agent` e `host` ao input. Em seguida, executa o caso de uso.
         */
        httpServer.on("post", "/generate_invoices", async function (params: any, body: any, headers: any) {
            const input = body;
            body.userAgent = headers["user-agent"];
            body.host = headers.host;
            const output = await useCase.execute(input);
            return output;
        });
    }
}