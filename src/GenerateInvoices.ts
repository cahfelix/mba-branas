
import moment from "moment";
import ContractDatabaseRepository from "./ContractDatabaseRepository";
import ContractRepository from "./ContractRepository";

type Input = {
    month: number,
    year: number,
    type: string
}

type Output = {
    date: string,
    amount: number
}

// Classe responsável por gerar notas fiscais a partir de contratos, 
// com base no regime escolhido: caixa (cash) ou competência (accrual). 
export default class GenerateInvoices  {

    // Aqui temos injeção de dependência: a classe recebe de fora um repositório (contractRepository) 
    // que implementa a interface ContractRepository.
    // O readonly significa que esse valor não pode ser alterado depois de ser atribuído no construtor.
    constructor (readonly contractRepository: ContractRepository) {
    }

    async execute(input: Input): Promise<Output[]> {
        const output: Output[] = [];
        const contracts = await this.contractRepository.list();  
        console.log("Contratos carregados:", contracts);

        
        for (const contract of contracts) {
            // Regime de caixa (cash)
            // Esse é o regime de caixa: só gera nota se o pagamento aconteceu naquele mês.
            if(input.type == 'cash') {
                for (const payment of contract.payments) {
                    // verficar se estou no mes de apuracao e o +1 pq janeiro = 0
                    // Se sim, gera uma nota fiscal com a data e o valor do pagamento.
                    if(payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;

                    output.push({ 
                            date: moment(payment.date).format("YYYY-MM-DD"),
                            amount: payment.amount
                    })
                }
            }

            // Regime de caixa (accrual)
            // Esse é o regime de competência: gera a nota com base no que deveria ser cobrado naquele mês, não no pagamento real.
            if(input.type == "accrual") {
                let period = 0;

                while (period < contract.periods) {
                    console.log('1', period);
                    // pegar data inicial e somar meses
                    const date = moment(contract.date). add(period++, 'months').toDate();
                    if(date.getMonth() + 1 !== input.month || date.getFullYear() !== input.year) continue;
                    const amount = contract.amount / contract.periods;
                    output.push({ date: moment(date).format("YYYY-MM-DD"), amount })                    
                }
            }
        }
        return output;
    }
}

