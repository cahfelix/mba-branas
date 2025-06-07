/**
 * Interface que define o contrato de um servidor HTTP.
 * 
 * Essa abstração permite que diferentes implementações (como Express, Fastify, etc.)
 * sejam usadas de forma intercambiável, mantendo o código desacoplado da tecnologia.
 */
export default interface HttpServer {
    on(method: string, url: string, callback: Function): void
    listen(port: number): void;
}