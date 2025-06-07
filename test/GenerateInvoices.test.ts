import GenerateInvoices from "../src/application/usecase/GenerateInvoices";
import ContractDatabaseRepository from "../src/infra/repository/ContractDatabaseRepository";
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import ContractRepository from "../src/application/repository/ContractRepository";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import CSVPresenter from "../src/infra/presenter/CSVPresenter";

let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection; 
let contractRepository: ContractRepository;

// Teste de integração
// Antes de cada teste, preparamos o ambiente, beforeEach ira executar algo antes de cada teste rodar.
beforeEach(() => {
    // ✅ Instanciando o adapter de conexão com banco
    connection = new PgPromiseAdapter();

    // ✅ Passando a conexão para o repositório
    contractRepository = new ContractDatabaseRepository(connection);

    // ✅ Injetando o repositório no serviço que gera notas fiscais
    generateInvoices = new GenerateInvoices(contractRepository); 
});

test("Deve gerar as notas fiscais por regime de caixa", async function(){
    // Entrada simulando a geração de notas para janeiro/2022, tipo 'cash'
    const input = {
        month: 1,
        year: 2022,
        type: "cash"
    }
    const output = await generateInvoices.execute(input);
    
    // Verifica se a data da primeira nota gerada está correta (5 de jan de 2022)
    expect(output.at(0)?.date).toEqual( new Date( "2022-01-05:13:00:00Z"));

    // Verifica se o valor gerado corresponde ao esperado (6000)
    expect(output.at(0)?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competencia", async function(){
    // Entrada para geração de notas para janeiro/2022, tipo 'accrual' (competência)

    const input = {
        month: 1,
        year: 2022,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);

    // Espera que a data da nota seja 1º de jan de 2022
    expect(output.at(0)?.date).toEqual( new Date( "2022-01-01:13:00:00Z")); // em 1/1 = 500 reais

    // Espera que o valor da nota seja 500 (6000 dividido por 12 meses)
    expect(output.at(0)?.amount).toBe(500); // 6000/ 12 meses = 500 reais
});

test("Deve gerar as notas fiscais por regime de competencia - mes 2", async function(){
    // Entrada para geração de notas para fevereiro/2022, tipo 'accrual'

    const input = {
        month: 2,
        year: 2022,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);
    
    // Verifica se a nota está para o dia 1º de fev de 2022
    expect(output.at(0)?.date).toEqual( new Date( "2022-02-01:13:00:00Z")); // em 1/2 = 500 reais


    // Verifica se o valor está correto (500)
    expect(output.at(0)?.amount).toBe(500); // 6000/ 12 meses = 500 reais
});

test("Deve gerar as notas fiscais por regime de competencia, por CSV", async function(){
    // Entrada para geração de notas em formato CSV para fev/2022

    const input = {
        month: 2,
        year: 2022,
        type: "accrual",
        format: "CSV"
    }
    
    // Instancia o apresentador CSV para formatar a saída
    const presenter = new CSVPresenter();

    // Cria o caso de uso com o apresentador para formatar o output
    const generateInvoices = new GenerateInvoices(contractRepository, presenter);

    // Executa o caso de uso
    const output = await generateInvoices.execute(input);

    // Verifica se a saída é exatamente a string esperada no formato CSV
    expect(output).toBe("2022-02-01;500"); 
});


// Após cada teste, fecha a conexão com o banco para evitar vazamento de recursos
afterEach(async () => {
    await connection.close();
});

// Para rodar esses testes, use o comando: npx jest
