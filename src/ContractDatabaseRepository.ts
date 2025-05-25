import pgPromise from 'pg-promise';
import ContractRepository from "./ContractRepository";

const pgp = pgPromise();

export default class ContractDatabaseRepository implements ContractRepository {
    async list (): Promise<any> {

        const db = 'postgres://camila.felix:123456@localhost:5432/app';
        const connection = pgp(db);
        const contracts = await connection.query("select * from branas.contract", []);


        for (const contract of contracts) {
            contract.payments = await connection.query(
                    "select * from branas.payment where id_contract = $1",
                    [contract.id_contract]
                );
        }
        await connection.$pool.end();
        return contracts;
    }
}