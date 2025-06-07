import Contract from "./Contract";
import Invoice from "./Invoice";
import InvoiceGenerationStrategy from "./InvoiceGenerationStrategy";

/**
 * Estratégia de geração de notas fiscais pelo regime de caixa.
 * 
 * No regime de caixa, as notas fiscais são geradas com base nas datas em que os pagamentos foram efetivamente realizados.
 * Isso significa que só são emitidas notas fiscais nos meses em que houveram pagamentos registrados.
 */
export default class CashBasisStrategy implements InvoiceGenerationStrategy {

    //Gera as notas fiscais com base no regime de caixa.
    generate(contract: Contract, month: number, year: number): Invoice[] {
        const invoices: Invoice[] = [];

        // Percorre todos os pagamentos registrados no contrato
        for (const payment of contract.getPayments()) {

            // Verifica se o pagamento foi feito no mês e ano especificado
            if (payment.date.getMonth() + 1 !== month || payment.date.getFullYear() !== year) continue;


            // Cria uma nota fiscal para o pagamento válido e adiciona à lista
            invoices.push(new Invoice(payment.date, payment.amount));
        }

        return invoices;
    }
}


