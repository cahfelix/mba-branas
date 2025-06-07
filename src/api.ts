import express from "express";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import ContractDatabaseRepository from "./infra/repository/ContractDatabaseRepository";
import LoggerDecorator from "./application/decorator/LoggerDecorator";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";

// ✅ Instanciando o app
const app = express();

// ✅ Converte o body, permite que o Express entenda JSON no corpo da requisição
app.use(express.json());

// ✅ Cria a conexão com o banco de dados usando PgPromise
const connection = new PgPromiseAdapter();

// ✅ Injeta a conexão no repositório de contratos
const contractRepository = new ContractDatabaseRepository(connection);

// ✅ Cria a instância do serviço que gera notas fiscais
const generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository));

// ✅ Define rota POST para gerar notas fiscais
app.post("/generate_invoices", async (req: any, res: any) => {
    const input = req.body;
    const output = await generateInvoices.execute(input);
    res.json(output);
})

// ✅ Inicia o servidor na porta 3001
app.listen(3001, () => {
    console.log("🚀 Servidor rodando na porta 3001");
});

// Dicas para rodar:
// - Execute com nodemon para hot reload: npx nodemon src/api.ts
// - Teste com curl: curl localhost:3001