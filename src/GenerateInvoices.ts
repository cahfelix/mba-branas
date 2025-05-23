import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = 'postgres://camila.felix:123456@localhost:5432/app';


export default class GenerateInvoices  {
    async execute() {
        const connection = pgp(db);
        const contracts = await connection.query("select * from branas.contract", [])
        
        console.log(contracts);
        return [];
    }
}