import GenerateInvoices from "../src/GenerateInvoices";

test("Deve gerar as notas fiscais por regime de caixa", async function(){
    const generateInvoices = new GenerateInvoices();
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
    const generateInvoices = new GenerateInvoices();
    const input = {
        month: 1,
        year: 2022,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2022-01-01"); // em 1/1 = 500 reais
    expect(output.at(0)?.amount).toBe(500); // 6000/ 12 meses = 500 reais
});








// rodar npx jest

// Eu gosto de atribuir um use case por classe, 
// pois eu acho que isso melhora a rastreadibilidade desse use case. 
// Eu acho que isso deixa tudo mais claro para você manipular, 
// e eu padronizo também, para que todo use case receba um determinado input. 
// Por enquanto deixa quieto esse input. Todo use case retorna um output. 


// Vou fazer um await, porque provavelmente deve ter alguma operação relacionada com banco de dados, e vamos ver o que sai do outro lado. Por enquanto eu só vou mostrar para você o que sai, não vou nem me dar o trabalho de criar uma condição.




// DTO - Data Transfer Object
// Objeto que so tem propriedades, sendo utilizado para transporte entre camadas da apliacao (
//Object, basicamente, é um objeto que só tem propriedades utilizadas para transporte entre camadas da aplicação. Essa é a ideia do DTO. Infelizmente, muita gente hoje, não exatamente infelizmente, pois cada um usa o que quer e é responsável por isso, usa linguagens orientadas a objetos, mas com um domínio muito anêmico. Ou seja, tem código procedural junto com DTOs, só objetos que só tem dados. Assim, o objeto se torna só uma estrutura de dado, não tem a ver com um design orientado a objetos. Eu vou até salvar isso aqui: patterns.txt

