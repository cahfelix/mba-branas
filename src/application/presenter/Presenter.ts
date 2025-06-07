import { Output } from "../usecase/GenerateInvoices";

/**
 * Interface Presenter define um contrato para classes responsáveis
 * por formatar ou apresentar os dados de saída (Output) de um caso de uso.
 * 
 * Cada implementação pode apresentar os dados de formas diferentes,
 * como JSON, CSV, XML, etc.
 */
export default interface Presenter {
    present(output: Output[]): Promise<any>;
}