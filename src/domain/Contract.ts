
import InvoiceGenerationFactory from "./InvoiceGenerationFactory";
import Payment from "./Payment";

/**
 * Representa um contrato com informações como descrição, valor total, número de parcelas,
 * data de início e lista de pagamentos efetuados.
 * 
 * A classe também é responsável por calcular o saldo restante do contrato
 * e gerar notas fiscais (invoices) com base em estratégias específicas (regime de caixa ou competência).
 */
export default class Contract {

    // Lista de pagamentos efetuados no contrato
    private payments: Payment[];

    /**
     * Cria uma instância de contrato.
     * 
     * @param idContract - Identificador único do contrato
     * @param description - Descrição do contrato
     * @param amount - Valor total do contrato
     * @param periods - Número total de períodos (parcelas)
     * @param date - Data de início do contrato
     */
    constructor(
        readonly idContract: string,
        readonly description: string,
        readonly amount: number,
        readonly periods: number,
        readonly date: Date
    ) {
        this.payments = [];
    }

    // Adiciona um pagamento à lista de pagamentos do contrato.
    addPayment(payment: Payment) {
        this.payments.push(payment);
    }

    // Retorna todos os pagamentos realizados neste contrato.
    getPayments() {
        return this.payments;
    }

    // Calcula o saldo restante do contrato (valor total - pagamentos efetuados).
    getBalance() {
        let balance = this.amount;
        for (const payment of this.payments) {
            balance -= payment.amount;
        }
        return balance;
    }

    /**
     * Gera as notas fiscais com base no tipo de regime informado (ex: "cash" ou "accrual").
     * 
     * @param month - Mês desejado para geração das notas
     * @param year - Ano desejado para geração das notas
     * @param type - Tipo de regime: "cash" (regime de caixa) ou "accrual" (regime de competência)
     * @returns Lista de objetos `Invoice` gerados
     */
    generateInvoices(month: number, year: number, type: string) {
        const invoiceGenerationStrategy = InvoiceGenerationFactory.create(type);
        return invoiceGenerationStrategy.generate(this, month, year);
    }
}