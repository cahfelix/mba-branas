import Contract from "../../domain/Contract";

/**
 * Interface para o repositório de contratos.
 * 
 * Define o contrato que qualquer implementação de persistência de dados 
 * (ex: banco de dados, memória, arquivo) deve seguir para lidar com objetos `Contract`.
 */
export default interface ContractRepository {

    // Retorna uma lista de todos os contratos cadastrados.
    list(): Promise<Contract[]>;
}