/**
 * Representa uma nota fiscal (invoice) gerada a partir de um contrato.
 * 
 * Cada nota contém a data de emissão e o valor correspondente.
 */
export default class Invoice {
    constructor(
        readonly date: Date,
        readonly amount: number,
    ) { }
}
