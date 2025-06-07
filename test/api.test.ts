import axios from "axios";

// Teste de integração para a API de geração de faturas.
// Ele envia uma requisição POST para o endpoint /generate_invoices com dados de input,
// e verifica se a resposta contém as informações corretas das faturas geradas.
test('Deve emitir as faturas pela api', async function () {
    // Define o input para a geração das faturas: mês, ano e tipo (regime de caixa)
    const input = {
        month: 1,
        year: 2022,
        type: "cash"
    }

    // Envia a requisição POST para a API local rodando na porta 3001
    const response = await axios.post("http://localhost:3001/generate_invoices", input);

    // Obtém o resultado retornado pela API
    const output = response.data;

    // Verifica se o valor da primeira fatura gerada está correto
    expect(output.at(0)?.amount).toBe(6000);

    // Verifica se a data da primeira fatura está correta no formato ISO string
    expect(output.at(0)?.date).toBe("2022-01-05T13:00:00.000Z");

    // Exibe no console o resultado da requisição para facilitar depuração
    console.log(response.data);
});