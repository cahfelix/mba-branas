import Contract from "./Contract";
import Invoice from "./Invoice";

export default interface InvoiceGenerationStrategy {
    // intercambiavel
    generate(contract: Contract, month: number, year: number, type: string): Invoice[];

    // generate(contract: Contract): Invoice[];
}