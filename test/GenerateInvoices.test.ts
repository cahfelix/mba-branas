import GenerateInvoices from "../src/GenerateInvoices";

test("Deve gerar as notas fiscais", async function(){
    const generateInvoices = new GenerateInvoices();
    const output = await generateInvoices.execute()
    expect(output).toHaveLength(0);
})

// rodar npx jest

// Eu gosto de atribuir um use case por classe, 
// pois eu acho que isso melhora a rastreadibilidade desse use case. 
// Eu acho que isso deixa tudo mais claro para você manipular, 
// e eu padronizo também, para que todo use case receba um determinado input. 
// Por enquanto deixa quieto esse input. Todo use case retorna um output. 


// Vou fazer um await, porque provavelmente deve ter alguma operação relacionada com banco de dados, e vamos ver o que sai do outro lado. Por enquanto eu só vou mostrar para você o que sai, não vou nem me dar o trabalho de criar uma condição.

