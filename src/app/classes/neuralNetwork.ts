import { Neuron } from "./neuronio";
import { TrainingOptions } from "./training-options";
import { shuffle } from "./shuffle-array";
import { TrainingPattern } from "./training";


export class NeuralNetwork {
    private camadas: Neuron[][]
    private momento: number = 0.5
    taxaAprendizagem: number

    qntEntradas: number = 4
    qntSaidas: number = 2
    qntcamadas: number = 0
    neuronios: number = 0
    funcaoAtivacao: string = 'null'
    epocas: number = 0
    intervaloPesos: number = 1;
    bias: number = 1

    constructor(trainingOptions: TrainingOptions) {
        this.qntcamadas = trainingOptions.camadas + 2
        this.neuronios = trainingOptions.neuronios
        this.funcaoAtivacao = trainingOptions.funcaoAtivacao
        this.taxaAprendizagem = trainingOptions.taxaAprendizagem
        this.epocas = trainingOptions.epocas
        this.camadas = [];

        for (let i: number = 0; i < this.qntcamadas - 1; i++){
            console.log("criar camada")
            this.camadas[i] = this.criarCamada(this.neuronios, this.qntEntradas, this.bias, this.intervaloPesos)}

        this.camadas[this.qntcamadas - 1] = this.criarCamada(this.qntSaidas, this.neuronios, this.bias, this.intervaloPesos)
    }

    criarCamada(qntNeuronios: number, qntEntradas: number, bias: number, intervaloPesos: number) {
        let camada: Neuron[] = [];

        for (let i: number = 0; i < qntNeuronios; i++) {
            let neuron = new Neuron(qntEntradas, bias, intervaloPesos, this.funcaoAtivacao);
            camada.push(neuron);
        }
        return camada;
    }

    run(entrada: number[]) {
        let saidaDaCamada: number[][] = []

        for (let i: number = 0; i <= this.camadas.length; i++)
            saidaDaCamada[i] = []

        let entradasCamadaAtual: number[] = entrada

        for (let indexCamada = 0; indexCamada < this.camadas.length; indexCamada++) {
            let camadaAtual = this.camadas[indexCamada]
            let saidaCamadaAtual = saidaDaCamada[indexCamada + 1]

            camadaAtual.forEach(neuron => {
                neuron.calcularValorSaida(entradasCamadaAtual)
                saidaCamadaAtual.push(neuron.valorSaida)
            });

            entradasCamadaAtual = saidaCamadaAtual
        }

        return saidaDaCamada[saidaDaCamada.length - 1]
    }

    train(getPatterns: () => TrainingPattern[], shufflePatterns: boolean, epocas: number, taxaAprendizagemPadrao: number, targetMSE: number) {
        if (isNaN(this.taxaAprendizagem))
            this.taxaAprendizagem = taxaAprendizagemPadrao

        for (let epoca = 0; epoca < epocas; epoca++) {
            let measuredMSE = 0;

            let patterns = shufflePatterns ? shuffle(getPatterns()) : getPatterns();

            patterns.forEach(pattern => {
                this.run(pattern.input);
                measuredMSE += this.adjust(pattern.output, this.taxaAprendizagem)
            })

            measuredMSE = measuredMSE / patterns.length;

            this.taxaAprendizagem = this.taxaAprendizagem * measuredMSE;

            if (measuredMSE <= targetMSE) break
        }
    }

    adjust(outputArray: number[], taxaAprendizagem: number) {
        let MSEsum = 0
        let numeroCamadas = this.camadas.length - 1
        let error: number[][] = []

        for (let l: number = numeroCamadas; l >= 0; --l) {
            let layer = this.camadas[l]

            error[l] = []
            for (let i: number = 0; i < layer[0].tamanhoCamada; i++)
                error[l].push(0)


            let nError = 0
            for (let n: number = 0; n < layer.length; n++) {
                let neuron = layer[n]

                if (l == numeroCamadas) {
                    nError = outputArray[n] - neuron.valorSaida;
                    MSEsum += nError * nError;
                } else
                    nError = error[l + 1][n]

                neuron.backpropagation(nError, taxaAprendizagem, this.momento, error[l])
            }
        }
        return MSEsum / (this.camadas[numeroCamadas].length)
    }

}