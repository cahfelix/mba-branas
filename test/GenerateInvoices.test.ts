import GenerateInvoices from "../src/GenerateInvoices";
import ContractDatabaseRepository from "../src/ContractDatabaseRepository";

let generateInvoices: GenerateInvoices;

// executar algo antes de cada teste rodar.
beforeEach(() =>{
    const contractRepository: ContractDatabaseRepository = {
        async list() : Promise<any> {
            // Simulando (mockando) uma versão do ContractDatabaseRepository
            return [
                {
                    iDContract: "",
                    description: "",
                    periods: 12,
                    amounth: "6000",
                    date: new Date("2022-01-01T10:00:00"),
                    payments: [
                        {
                            idPayment: "",
                            idContract: "",
                            amount: 6000,
                            date: new Date("2022-01-05T10:00:00")
                            
                        }
                    ]
                }
            ]
        }
    }
    // com mock
    generateInvoices = new GenerateInvoices(contractRepository);
    // com bando de dados
    // generateInvoices = new GenerateInvoices(new ContractDatabaseRepository()); 
});

test("Deve gerar as notas fiscais por regime de caixa", async function(){
    const input = {
        month: 1,
        year: 2022,
        type: "cash"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2022-01-05");
    expect(output.at(0)?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competencia", async function(){
    const input = {
        month: 1,
        year: 2022,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2022-01-01"); // em 1/1 = 500 reais
    expect(output.at(0)?.amount).toBe(500); // 6000/ 12 meses = 500 reais
});

test("Deve gerar as notas fiscais por regime de competencia - mes 2", async function(){
    const input = {
        month: 2,
        year: 2022,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2022-02-01"); // em 1/2 = 500 reais
    expect(output.at(0)?.amount).toBe(500); // 6000/ 12 meses = 500 reais
});

// rodar npx jest