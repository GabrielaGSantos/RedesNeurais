export class Neuron {
    private bias: number
    private momento: number
    private entradas: number[]
    private pesos: number[]
    private momentos: number[]
    public tamanhoCamada: number
    public valorSaida: number
    public funcaoAtivacao: string

    constructor(quantidadeEntradas: number, bias: number, faixaDePeso: number, funcaoAtivacao: string) {
        this.tamanhoCamada = quantidadeEntradas;
        this.bias = bias
        this.momento = 0
        this.funcaoAtivacao = funcaoAtivacao

        this.entradas = new Array<number>()
        this.pesos = new Array<number>()
        this.momentos = new Array<number>()

        for (let i = 0; i < this.tamanhoCamada; i++) {
            this.entradas[i] = NaN;
            this.pesos[i] = (Math.random() * 2 * faixaDePeso) - faixaDePeso;
            this.momentos[i] = 0;
        }
    }

    backpropagation(nErro: number, taxaDeAprendizagem: number, momentoGlobal: number, erro: number[]): void {
        let valorFuncao = 0

        if(this.funcaoAtivacao == "sigmoid")
            valorFuncao = (1 - this.valorSaida)
        
        if(this.funcaoAtivacao == 'relu')            
            valorFuncao = this.valorSaida > 1 ? 1:0

        let delta: number = nErro * this.valorSaida * valorFuncao

        for (let i = 0; i < this.tamanhoCamada; i++) {
            let mudancaPeso = delta * this.entradas[i] * taxaDeAprendizagem + this.momentos[i] * momentoGlobal;
            this.momentos[i] = mudancaPeso
            this.pesos[i] += mudancaPeso
            erro[i] += delta * this.pesos[i]
        }

        let mudancaBias: number = delta * taxaDeAprendizagem + this.momento * momentoGlobal;
        this.momento = mudancaBias
        this.bias += mudancaBias
    }

    calcularValorSaida(entradasAtuais: number[]): void {
        this.entradas = entradasAtuais;
        let somaPonderada: number = 0;

        for (let i = 0; i < this.tamanhoCamada; i++) 
            somaPonderada += this.pesos[i] * this.entradas[i]        

        this.valorSaida = Neuron.ativacao(somaPonderada, this.bias, this.funcaoAtivacao);
    }

    static ativacao(value: number, bias: number, funcaoAtivacao: string) {
        if (funcaoAtivacao == 'sigmoid')
            return 1 / (1 + Math.exp(-(value + bias)))

        else if (funcaoAtivacao == 'relu')
            return (Math.max(0, (value + bias)))
        else
            return 0
    }

}