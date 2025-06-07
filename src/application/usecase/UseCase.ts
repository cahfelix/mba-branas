/**
 * Interface genérica para casos de uso (use cases) na aplicação.
 * 
 * Segue o padrão do design de Clean Architecture, onde cada caso de uso 
 * representa uma ação ou regra de negócio da aplicação.
 */
export default interface UseCase {
    /**
     * Executa o caso de uso com os dados de entrada fornecidos.
     * 
     * @param input Dados necessários para executar o caso de uso.
     * @returns Um `Promise` contendo o resultado do processamento.
     */
    execute(input: any): Promise<any>;
}