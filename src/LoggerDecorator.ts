import UseCase from "./UseCase";

export default class LoggerDecorator implements UseCase {
    constructor(readonly usecase: UseCase) {
        
    }

    execute(input: any) : Promise<any> {
        console.log(input.userAgent);
        console.log("[LoggerDecorator] Executando com input:", JSON.stringify(input, null, 2));
        
        return this.usecase.execute(input);

    }
}