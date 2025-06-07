import Contract from "./Contract";
import Invoice from "./Invoice";

/**
 * Interface que define o contrato para estratégias de geração de notas fiscais.
 * 
 * Essa interface permite a aplicação do padrão Strategy, possibilitando
 * a troca dinâmica da lógica de geração de notas (regime de caixa ou competência, por exemplo).
 * 
 * Implementações típicas:
 * - CashBasisStrategy (regime de caixa)
 * - AccrualBasisStrategy (regime de competência)
 */

export default interface InvoiceGenerationStrategy {
    /**
     * Gera as notas fiscais para um contrato específico, com base em uma estratégia
     * definida (ex: regime de caixa ou competência), mês e ano fornecidos.
     * 
     * @param contract - Contrato para o qual as faturas devem ser geradas
     * @param month - Mês de referência da fatura (1 a 12)
     * @param year - Ano de referência da fatura (ex: 2022)
     * @param type - Tipo da estratégia (ex: "cash" ou "accrual")
     * @returns Lista de notas fiscais geradas
     */
    generate(contract: Contract, month: number, year: number, type: string): Invoice[];

    // Alternativamente, a assinatura pode ser simplificada para:
    // generate(contract: Contract): Invoice[];

}