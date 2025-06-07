import ContractDatabaseRepository from "./ContractDatabaseRepository";
import ExpressAdapter from "./ExpressAdapter";
import GenerateInvoices from "./GenerateInvoices";
import LoggerDecorator from "./LoggerDecorator";
import MainController from "./MainController";
import PgPromiseAdapter from "./PgPromiseAdapter";

// ✅ Cria a conexão com o banco de dados usando PgPromise
const connection = new PgPromiseAdapter();

// ✅ Injeta a conexão no repositório de contratos
const contractRepository = new ContractDatabaseRepository(connection);

// ✅ Cria a instância do serviço que gera notas fiscais
const generateInvoices = new LoggerDecorator( new GenerateInvoices(contractRepository));


const httpServer = new ExpressAdapter();
new MainController(httpServer, generateInvoices);
httpServer.listen(3001);