import Presenter from '../../application/presenter/Presenter';
import { Output } from '../../application/usecase/GenerateInvoices';

/**
 * Classe responsável por apresentar a saída dos dados no formato JSON.
 * Implementa a interface Presenter garantindo o método `present`.
 */
export default class JsonPresenter implements Presenter {

    /**
     * Método que recebe um array de objetos Output e simplesmente retorna
     * esse array sem alterações, mantendo o formato JSON.
     * 
     * @param output Array de objetos contendo dados das notas fiscais.
     * @returns O mesmo array recebido, no formato JSON.
     */
    present(output: Output[]) : any {
        return output;
    }
}
