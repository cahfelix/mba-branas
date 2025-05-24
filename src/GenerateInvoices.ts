import pgPromise from 'pg-promise';
import moment from "moment";

const pgp = pgPromise();
const db = 'postgres://camila.felix:123456@localhost:5432/app';

export default class GenerateInvoices  {
    async execute(input: Input): Promise<Output[]> {

        const connection = pgp(db);
        const contracts = await connection.query("select * from branas.contract", []);
        const output: Output[] = [];
        
        for (const contract of contracts) {
            if(input.type == 'cash') {
                const payments = await connection.query(
                    "select * from branas.payment where id_contract = $1",
                    [contract.id_contract]
                );
                for (const payment of payments) {
                    // estou no mes de apuracao?
                    // +1 pq janeiro = 0
                    if(payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;

                    output.push({ 
                            date: moment(payment.date).format("YYYY-MM-DD"),
                            amount: parseFloat(payment.amount)
                    })
                }
            }

            if(input.type == "accrual") {
                let period = 0;

                while (period < contract.periods) {
                    console.log('1', period);
                    // pegar data inicial e somar meses
                    const date = moment(contract.date). add(period++, 'months').toDate();
                    if(date.getMonth() + 1 !== input.month || date.getFullYear() !== input.year) continue;
                    const amount = parseFloat(contract.amount) / contract.periods;
                    output.push({ date: moment(date).format("YYYY-MM-DD"), amount })                    
                }
            }
        }
        await connection.$pool.end();
        return output;
    }
}

type Input = {
    month: number,
    year: number,
    type: string
}

type Output = {
    date: string,
    amount: number
}