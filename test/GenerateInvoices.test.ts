import GenerateInvoices from "../src/GenerateInvoices";
import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import PgPromiseAdapter from "../src/PgPromiseAdapter";
import DatabaseConnection from "../src/DatabaseConnection";
import CSVPresenter from "../src/CSVPresenter";
import ContractRepository from "../src/ContractRepository";

let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection; 
let contractRepository: ContractRepository;



// teste de integração
// executar algo antes de cada teste rodar.
beforeEach(() => {
    // ✅ Instanciando o adapter de conexão com banco
    connection = new PgPromiseAdapter();

    // ✅ Passando a conexão para o repositório
    contractRepository = new ContractDatabaseRepository(connection);

    // ✅ Injetando o repositório no serviço que gera notas fiscais
    generateInvoices = new GenerateInvoices(contractRepository); 
});

test("Deve gerar as notas fiscais por regime de caixa", async function(){
    const input = {
        month: 1,
        year: 2022,
        type: "cash"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toEqual( new Date( "2022-01-05:13:00:00Z"));
    expect(output.at(0)?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competencia", async function(){
    const input = {
        month: 1,
        year: 2022,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toEqual( new Date( "2022-01-01:13:00:00Z")); // em 1/1 = 500 reais
    expect(output.at(0)?.amount).toBe(500); // 6000/ 12 meses = 500 reais
});

test("Deve gerar as notas fiscais por regime de competencia - mes 2", async function(){
    const input = {
        month: 2,
        year: 2022,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toEqual( new Date( "2022-02-01:13:00:00Z")); // em 1/2 = 500 reais
    expect(output.at(0)?.amount).toBe(500); // 6000/ 12 meses = 500 reais
});

test("Deve gerar as notas fiscais por regime de competencia, por CSV", async function(){
    const input = {
        month: 2,
        year: 2022,
        type: "accrual",
        format: "CSV"
    }
    const presenter = new CSVPresenter();
    const generateInvoices = new GenerateInvoices(contractRepository, presenter);
    const output = await generateInvoices.execute(input);
    expect(output).toBe("2022-02-01;500"); 
});


afterEach(async () => {
    // ✅ Fechando conexão após cada teste
    await connection.close();
});

// rodar npx jest