/**
 * Adapter
 * Interface que define o contrato para conexões com banco de dados.
 * 
 * Essa abstração permite implementar diferentes adaptadores de conexão (por exemplo, com PostgreSQL, SQLite, etc.)
 * sem acoplar a lógica da aplicação a uma tecnologia específica.
 */
export default interface DatabaseConnection {
    query(statement: string, params: any): Promise<any>;
    close(): Promise<void>;
}

