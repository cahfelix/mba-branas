import ContractRepository from "../../application/repository/ContractRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import Payment from "../../domain/Payment";
import Contract from "../../domain/Contract";

/**
 * Repositório para acesso a dados de contratos no banco de dados.
 * Implementa a interface ContractRepository para garantir a implementação dos métodos esperados.
 */
export default class ContractDatabaseRepository implements ContractRepository {

    /**
     * Cria uma nova instância do repositório com a conexão ao banco de dados.
     * @param connection - Instância que representa a conexão com o banco (ex: PgPromiseAdapter).
     * A conexão é injetada para tornar o código mais flexível e testável.
     */
    constructor(readonly connection: DatabaseConnection) { }

    // Recupera todos os contratos cadastrados no banco, incluindo seus pagamentos associados.
    async list(): Promise<Contract[]> {
        const contracts: Contract[] = [];

        // Busca todos os contratos na tabela "branas.contract"
        const contractsData = await this.connection.query("select * from branas.contract", []);

        // Para cada contrato encontrado, carrega seus pagamentos relacionados (associados usando o id do contrato.)
        for (const contractData of contractsData) {
            const contract = new Contract(
                contractData.id_contract,
                contractData.description,
                parseFloat(contractData.amount),
                contractData.periods,
                contractData.date,
            )

            // Busca pagamentos associados ao contrato pelo id
            const paymentsData = await this.connection.query(
                "select * from branas.payment where id_contract = $1",
                [contract.idContract]
            );

            // Adiciona cada pagamento ao contrato
            for (const paymentData of paymentsData) {
                contract.addPayment(new Payment(
                    paymentData.id_payment,
                    parseFloat(paymentData.amount),
                    paymentData.periods,
                    paymentData.date
                )
                )
            }

            // Adiciona o contrato já populado à lista final
            contracts.push(contract);
        }

        // Retorna todos os contratos com seus pagamento
        return contracts;
    }

}