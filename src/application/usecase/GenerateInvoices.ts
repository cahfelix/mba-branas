import ContractRepository from "../repository/ContractRepository";
import JsonPresenter from "../../infra/presenter/JsonPresenter";
import Presenter from "../presenter/Presenter";
import UseCase from "./UseCase";

/**
 * Tipo de entrada esperada para a geração de notas fiscais.
 * - `month`: mês desejado.
 * - `year`: ano desejado.
 * - `type`: tipo de regime (ex: "cash" para caixa, "accrual" para competência).
 */
type Input = {
    month: number,
    year: number,
    type: string
}

/**
 * Tipo de saída gerada após o processamento das notas fiscais.
 * - `date`: data da nota fiscal.
 * - `amount`: valor da nota fiscal.
 */
export type Output = {
    date: Date,
    amount: number
}

/**
 * Caso de uso responsável por gerar notas fiscais a partir dos contratos,
 * com base no regime selecionado: regime de caixa ("cash") ou regime de competência ("accrual").
 * 
 * Implementa a interface `UseCase`.
 */
export default class GenerateInvoices implements UseCase {

    // Aqui temos injeção de dependência: a classe recebe de fora um repositório (contractRepository) 
    // que implementa a interface ContractRepository.
    // O readonly significa que esse valor não pode ser alterado depois de ser atribuído no construtor.

    /**
     * @param contractRepository Repositório de contratos, responsável por buscar os contratos existentes.
     * @param presenter (opcional) Apresentador responsável por formatar a saída; por padrão, usa `JsonPresenter`.
     */
    constructor(
        readonly contractRepository: ContractRepository,
        readonly presenter: Presenter = new JsonPresenter()
    ) { }

    /**
     * Executa a geração de notas fiscais para os contratos disponíveis,
     * aplicando o tipo de regime especificado (caixa ou competência).
     * 
     * @param input Objeto com mês, ano e tipo de regime.
     * @returns Lista de notas fiscais geradas, formatadas pelo presenter.
     */
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

        // Apresenta a saída formatada (JSON, CSV, etc.)
        return this.presenter.present(output);
    }
}

