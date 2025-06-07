import Contract from "../src/domain/Contract";
import Payment from "../src/domain/Payment";

// Teste de unidade para verificar o cálculo do saldo do contrato após pagamentos
test("Deve calcular saldo do contrato contrato", function () {
    // Cria um contrato de valor 6000 dividido em 12 períodos, com data inicial
    const contract = new Contract("", "", 6000, 12, new Date("2022-01-01T10:00:00"));

    // Adiciona um pagamento de 2000 feito na data inicial, referente a 3 períodos
    contract.addPayment(
        new Payment(
            "",         // idPayment (não utilizado nesse teste)
            2000,       // valor do pagamento
            3,          // número de períodos pagos
            new Date("2022-01-01T10:00:00") // data do pagamento
        )
    );

    // Verifica se o saldo restante do contrato é 4000 (6000 - 2000)
    expect(contract.getBalance()).toBe(4000);
});

// Teste de unidade para verificar a geração correta das faturas segundo o regime de competência (accrual)
test("Deve gerar faturas de um contrato", function () {
    // Cria um contrato no valor total de 6000, parcelado em 12 meses, com data inicial
    const contract = new Contract("", "", 6000, 12, new Date("2022-01-01T10:00:00"));

    // Gera as faturas para janeiro de 2022 usando o regime de competência
    const invoices = contract.generateInvoices(1, 2022, "accrual");

    // Verifica se a data da primeira fatura gerada é 01/01/2022 (ajustada para fuso horário UTC)
    expect(invoices.at(0)?.date).toEqual(new Date("2022-01-01T13:00:00.000Z"));

    // Verifica se o valor da primeira fatura corresponde a 1/12 do valor total (6000/12 = 500)
    expect(invoices.at(0)?.amount).toBe(500);
});
