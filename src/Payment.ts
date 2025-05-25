export default class Payment {

    // payments: Payment[];

    constructor(
        readonly idPayment: string, 
        readonly amount: number, 
        readonly periods: number, 
        readonly date: Date
    ) {
            
    }
}