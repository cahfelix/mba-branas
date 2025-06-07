import moment from "moment";

import ContractDatabaseRepository from "./ContractDatabaseRepository";
import ContractRepository from "./ContractRepository";
import Presenter from "./Presenter";
import JsonPresenter from "./JsonPresenter";
import UseCase from "./UseCase";

type Input = {
    month: number,
    year: number,
    type: string
}

export type Output = {
    date: Date,
    amount: number
}

// Classe responsável por gerar notas fiscais a partir de contratos, 
// com base no regime escolhido: caixa (cash) ou competência (accrual). 
export default class GenerateInvoices implements UseCase {

    // Aqui temos injeção de dependência: a classe recebe de fora um repositório (contractRepository) 
    // que implementa a interface ContractRepository.
    // O readonly significa que esse valor não pode ser alterado depois de ser atribuído no construtor.
    constructor(
        readonly contractRepository: ContractRepository, 
        readonly presenter: Presenter = new JsonPresenter()) {
    }

    async execute(input: Input): Promise<Output[]> {
        const output: Output[] = [];
        const contracts = await this.contractRepository.list();
        console.log("Contratos carregados:", contracts);

        for (const contract of contracts) {
            const invoices = contract.generateInvoices(input.month, input.year, input.type);
            for (const invoice of invoices) {
                output.push({ date: invoice.date, amount: invoice.amount })
            }

        }
        // return output;
        return this.presenter.present(output);
    }
}

