import moment from "moment";
import Contract from "./Contract";
import Invoice from "./Invoice";
import InvoiceGenerationStrategy from "./InvoiceGenerationStrategy";

/**
 * Estratégia de geração de notas fiscais pelo regime de competência.
 * 
 * No regime de competência, as notas são geradas de forma proporcional ao tempo do contrato,
 * ou seja, distribuídas ao longo dos meses de vigência, independentemente do pagamento ter sido efetuado.
 */
export default class AccrualBasisStrategy implements InvoiceGenerationStrategy {

    // Gera as notas fiscais com base no regime de competência.
    generate(contract: Contract, month: number, year: number): Invoice[] {

        const invoices: Invoice[] = [];
        let period = 0;

        // Itera sobre os períodos do contrato para calcular a parcela de cada mês
        while (period <= contract.periods) {
            // Calcula a data de cada parcela somando meses à data inicial ou seja pegaa data inicial e somar meses
            const date = moment(contract.date).add(period++, 'months').toDate();

            // Verifica se a data corresponde ao mês/ano solicitado
            if (date.getMonth() + 1 !== month || date.getFullYear() !== year) continue;

            // Calcula o valor proporcional da nota fiscal
            const amount = contract.amount / contract.periods;

            // Cria e adiciona a nota fiscal à lista
            invoices.push(new Invoice(date, amount))
        }

        return invoices;
    }
}


