import moment from 'moment';
import Presenter from '../../application/presenter/Presenter';
import { Output } from '../../application/usecase/GenerateInvoices';

/**
 * Classe responsável por formatar a saída das notas fiscais em formato CSV.
 * Implementa a interface Presenter para garantir o método `present`.
 */
export default class CSVPresenter implements Presenter {

    /**
     * Recebe um array de objetos Output e converte para uma string no formato CSV.
     * Cada linha contém a data formatada como 'YYYY-MM-DD' e o valor da nota,
     * separados por ponto e vírgula (;).
     * 
     * @param output Array de objetos contendo dados das notas fiscais (date e amount).
     * @returns Uma string formatada no padrão CSV com as notas fiscais.
     */
    present(output: Output[]): any {
        const lines: any[] = [];

        // Laço que percorre cada nota fiscal para montar a linha CSV
        for (const data of output) {
            const line: string[] = [];
            // Formata a data no padrão ISO (ano-mês-dia)
            line.push(moment(data.date).format('YYYY-MM-DD'));
            // Converte o valor para string
            line.push(`${data.amount}`)
            // Junta os campos com ';' e adiciona na lista de linhas
            lines.push(line.join(";"))
        }

        // Junta todas as linhas com quebras de linha para formar o CSV completo
        return lines.join("\n")
    }
}
