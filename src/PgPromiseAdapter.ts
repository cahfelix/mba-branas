import DatabaseConnection from "./DatabaseConnection";
import pgPromise from 'pg-promise';

const pgp = pgPromise();

export default class PgPromiseAdapter implements DatabaseConnection {
    connection: any;

    constructor() {
        const db = 'postgres://camila.felix:123456@localhost:5432/app';
        this.connection = pgp(db);
    }

    query (statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params)
        
    }
    async close(): Promise<void> {
        await this. connection.$pool.end();
    }
        
}