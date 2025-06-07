import AccrualBasisStrategy from "./AccrualBasisStrategy";
import CashBasisStrategy from "./CashBasisStrategy";

/**
 * Fábrica responsável por criar a estratégia adequada de geração de notas fiscais.
 * 
 * A estratégia varia de acordo com o tipo informado:
 * - `"cash"`: regime de caixa (considera as datas dos pagamentos)
 * - `"accrual"`: regime de competência (distribui o valor proporcionalmente ao longo dos meses)
 */
export default class InvoiceGenerationFactory {
    static create(type: string) {
        if (type === "cash") {
            return new CashBasisStrategy();
        }
        if (type === "accrual") {
            return new AccrualBasisStrategy();
        }
        throw new Error("Invalid Type");
    }
}