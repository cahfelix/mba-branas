/**
 * Representa um pagamento realizado dentro de um contrato.
 * 
 * Cada pagamento tem um valor, uma data e pode estar relacionado
 * a múltiplos períodos (parcelas) de um contrato.
 */
export default class Payment {
    /**
     * Cria uma nova instância de pagamento.
     * 
     * @param idPayment - Identificador único do pagamento
     * @param amount - Valor pago
     * @param periods - Quantidade de períodos (ex: parcelas) associadas a esse pagamento
     * @param date - Data em que o pagamento foi realizado
     */

    constructor(
        readonly idPayment: string,
        readonly amount: number,
        readonly periods: number,
        readonly date: Date
    ) { }
}