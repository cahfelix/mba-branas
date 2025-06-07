import moment from 'moment';
import Presenter from './Presenter';
import { Output } from './GenerateInvoices';


export default class CSVPresenter implements Presenter {

    // present(output: Output[]): string

    present(output: Output[]): any {
        const lines: any[] = [];
        // const lines: string[] = [];

        // 👉 Cabeçalho do CSV
        // lines.push("date;amount");
        
        for (const data of output) {
            const line: string[] = [];
            line.push(moment(data.date).format('YYYY-MM-DD'));
            line.push(`${data.amount}`)
            lines.push(line.join(";"))
        }

        return lines.join("\n")
    }
}

