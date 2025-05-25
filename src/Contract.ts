import moment from "moment";
import Invoice from "./Invoice";
import Payment from "./Payment";

export default class Contract {

    private payments: Payment[];

    constructor(
        readonly idContract: string, 
        readonly description: string, 
        readonly amount: number, 
        readonly periods: number, 
        readonly date: Date
    ) {
        this.payments = [];
    }

    addPayment(payment: Payment)  {
        this.payments.push(payment);
    }

    getPayments()  {
        return this.payments;
    }

    generateInvoices(month: number, year: number, type: string) {
        const invoices: Invoice[] = [];
            // Regime de caixa (cash)
            // Esse é o regime de caixa: só gera nota se o pagamento aconteceu naquele mês.
            if(type == 'cash') {
                for (const payment of this.getPayments()) {
                    // verficar se estou no mes de apuracao e o +1 pq janeiro = 0
                    // Se sim, gera uma nota fiscal com a data e o valor do pagamento.
                    if(payment.date.getMonth() + 1 !== month || payment.date.getFullYear() !== year) continue;
                    invoices.push(new Invoice(payment.date, payment.amount));
                }
            }

            // Regime de caixa (accrual)
            // Esse é o regime de competência: gera a nota com base no que deveria ser cobrado naquele mês, não no pagamento real.
            if(type == "accrual") {
                let period = 0;

                while (period <= this.periods) {
                    console.log('1', period);
                    // pegar data inicial e somar meses
                    const date = moment(this.date). add(period++, 'months').toDate();
                    if(date.getMonth() + 1 !== month || date.getFullYear() !== year) continue;
                    const amount = this.amount / this.periods;
                    invoices.push(new Invoice(date, amount ))                    
                }
            }
        return invoices;
    }
}