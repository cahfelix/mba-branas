import Contract from "./Contract";
import ContractRepository from "./ContractRepository";
import DatabaseConnection from "./DatabaseConnection";
import Payment from "./Payment";

// Esta classe é responsável por acessar os dados de contratos no banco de dados.
// Ela implementa a interface ContractRepository, garantindo que tenha os métodos esperados.
export default class ContractDatabaseRepository implements ContractRepository {

    // Injeção de dependência:
    // Recebemos uma instância de DatabaseConnection (ex: PgPromiseAdapter) de fora da classe.
    // Isso torna o código mais flexível e fácil de testar.
    // O "readonly" garante que essa conexão não será alterada depois de criada.
    constructor (readonly connection: DatabaseConnection) { }

    // Método que retorna a lista de contratos, já com seus respectivos pagamentos.
    async list(): Promise<Contract[]> {
        const contracts: Contract[] = [];

        // Consulta todos os contratos da tabela.
        const contractsData = await this.connection.query("select * from branas.contract", []);

        // Para cada contrato, buscamos os pagamentos associados usando o id do contrato.
        for (const contractData of contractsData) {
            const contract = new Contract(
                contractData.id_contract, 
                contractData.description, 
                parseFloat(contractData.amount), 
                contractData.periods, 
                contractData.date
            )
            const paymentsData = await this.connection.query(
                    "select * from branas.payment where id_contract = $1",
                    [contract.idContract]
            );
            for (const paymentData of paymentsData) {
                contract.payments.push(new Payment(
                    paymentData.id_payment, 
                    parseFloat(paymentData.amount), 
                    paymentData.periods, 
                    paymentData.date
                )
            ) }
            contracts.push(contract);
        }
        // Retorna os contratos, agora com os pagamentos incluídos.
        return contracts;
    }

}