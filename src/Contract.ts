import Payment from "./Payment";

export default class Contract {

    payments: Payment[];

    constructor(
        readonly idContract: string, 
        readonly description: string, 
        readonly amount: number, 
        readonly periods: number, 
        readonly date: Date
    ) {
        this.payments = [];
    }
}