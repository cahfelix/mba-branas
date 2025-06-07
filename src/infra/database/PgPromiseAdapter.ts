
import pgPromise from 'pg-promise';
import DatabaseConnection from './DatabaseConnection';

const pgp = pgPromise();

/**
 * Implementação da interface `DatabaseConnection` utilizando a biblioteca `pg-promise`.
 * 
 * Esse adapter permite que sua aplicação se conecte a um banco de dados PostgreSQL
 * de forma desacoplada, seguindo o princípio de inversão de dependência.
 */
export default class PgPromiseAdapter implements DatabaseConnection {
    connection: any;

    /**
    * Cria uma nova instância do adapter e estabelece a conexão com o banco PostgreSQL.
    * A string de conexão está embutida, mas poderia ser extraída para um arquivo `.env` para mais segurança.
    */
    constructor() {
        const db = 'postgres://camila.felix:123456@localhost:5432/app';
        this.connection = pgp(db);
    }

    // Executa uma consulta SQL utilizando a conexão com o banco.
    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params)
    }

    // Encerra a conexão com o banco de dados, liberando os recursos.
    async close(): Promise<void> {
        await this.connection.$pool.end();
    }
}