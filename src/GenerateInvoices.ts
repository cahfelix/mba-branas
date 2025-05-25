import moment from "moment";

import ContractDatabaseRepository from "./ContractDatabaseRepository";
import ContractRepository from "./ContractRepository";

type Input = {
    month: number,
    year: number,
    type: string
}

type Output = {
    date: string,
    amount: number
}

// Classe responsável por gerar notas fiscais a partir de contratos, 
// com base no regime escolhido: caixa (cash) ou competência (accrual). 
export default class GenerateInvoices  {

    // Aqui temos injeção de dependência: a classe recebe de fora um repositório (contractRepository) 
    // que implementa a interface ContractRepository.
    // O readonly significa que esse valor não pode ser alterado depois de ser atribuído no construtor.
    constructor (readonly contractRepository: ContractRepository) {
    }

    async execute(input: Input): Promise<Output[]> {
        const output: Output[] = [];
        const contracts = await this.contractRepository.list();
        console.log("Contratos carregados:", contracts);

        for (const contract of contracts) {
            const invoices = contract.generateInvoices(input.month, input.year, input.type);
            for (const invoice of invoices)  {
                output.push({date: moment(invoice.date).format("YYYY-MM-DD"), amount: invoice.amount})
            }
           
        }
        return output;
    }
}

