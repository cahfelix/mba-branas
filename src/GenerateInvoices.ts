import pgPromise from 'pg-promise';
import moment from "moment";

const pgp = pgPromise();
const db = 'postgres://camila.felix:123456@localhost:5432/app';

export default class GenerateInvoices  {
    async execute(input: Input): Promise<Output[]> {

        const connection = pgp(db);
        const contracts = await connection.query("select * from branas.contract", []);
        const output: Output[] = [];
        // console.log('a', contracts);
        for (const contract of contracts) {
            console.log('b', contracts);
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
            console.log(payments);
        }
        await connection.$pool.end();
        return output;
    }
}

type Input = {
    month: number,
    year: number
}

type Output = {
    date: string,
    amount: number
}