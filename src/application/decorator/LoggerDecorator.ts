import UseCase from "../usecase/UseCase";

/**
 * LoggerDecorator é um decorador para casos de uso (UseCase)
 * que adiciona logs antes de executar o caso de uso real.
 * 
 * Ele implementa a interface UseCase, então pode ser usado
 * em qualquer lugar que um UseCase seja esperado, adicionando
 * comportamento extra (log) sem modificar a lógica original.
 */
export default class LoggerDecorator implements UseCase {
    // Recebe a instância do caso de uso a ser decorada.
    constructor(readonly usecase: UseCase) { }

    // Executa o caso de uso, imprimindo informações de log antes.
    execute(input: any): Promise<any> {
        // Log simples do userAgent, se existir no input
        console.log(input.userAgent);

        // Log detalhado do input formatado para melhor leitura
        console.log("[LoggerDecorator] Executando com input:", JSON.stringify(input, null, 2));

        // Executa o caso de uso original e retorna o resultado
        return this.usecase.execute(input);
    }
}