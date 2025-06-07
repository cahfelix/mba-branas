import ContractDatabaseRepository from "./infra/repository/ContractDatabaseRepository";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import LoggerDecorator from "./application/decorator/LoggerDecorator";
import MainController from "./infra/http/MainController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import Mediator from "./infra/mediator/Mediator";
import JsonPresenter from "./infra/presenter/JsonPresenter";
import SendEmail from "./application/usecase/SendEmail";

// ✅ Cria a conexão com o banco de dados usando PgPromise
const connection = new PgPromiseAdapter();

// ✅ Injeta a conexão no repositório de contratos
const contractRepository = new ContractDatabaseRepository(connection);

// ✅ Chama mediator
const mediator = new Mediator();
const sendEmail = new SendEmail();
mediator.on("InvoicesGenerated", async function (data: any) {
	await sendEmail.execute(data);
});

// ✅ Cria a instância do serviço que gera notas fiscais
const generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository, new JsonPresenter(), mediator));

// ✅ Cria o servidor HTTP usando Express, que será responsável por receber requisições web.
const httpServer = new ExpressAdapter();

// ✅ Instancia o controlador principal da aplicação,
new MainController(httpServer, generateInvoices);

// ✅ Inicia o servidor HTTP na porta 3001,
httpServer.listen(3001);