import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { TrainingOptions } from '../classes/training-options'
import { Elemento } from '../classes/element'
import { TrainingPattern } from '../classes/training'
import { shuffle } from '../classes/shuffle-array'
import { Neuron } from '../classes/neuronio'
import { NeuralNetwork } from '../classes/neuralNetwork';

let self: TrainingService

@Injectable({
  providedIn: 'root'
})

export class TrainingService {

  elementos: Elemento[] = []
  entradas: TrainingPattern[] = []
  
  taxaObjetivo: number = 0.01

  private opcoesTreinamentoAnnounceSource = new Subject<TrainingOptions>()
  opcoesTreinamentoAnnounce$ = this.opcoesTreinamentoAnnounceSource.asObservable()

  private tableAnnounceSource = new Subject<Elemento[]>()
  tableAnnounce$ = this.tableAnnounceSource.asObservable()

  constructor() {
    self = this
  }

  announceopcoesTreinamento(trainingOptions: TrainingOptions) {

    self.opcoesTreinamentoAnnounceSource.next(trainingOptions)

    self.entradas = self.gerarEntradas()
    let nnet: NeuralNetwork = new NeuralNetwork(trainingOptions);
    nnet.train(() => self.entradas, false, trainingOptions.epocas, trainingOptions.taxaAprendizagem, self.taxaObjetivo)
  }

  // recebe os valores da tabela verdade do arquivo table em formato ELEMENTO
  announcetable(elementos: Elemento[]) {
    this.elementos = elementos
  }

  gerarEntradas() {
    let vetorEntradas: TrainingPattern[] = []

    self.elementos.forEach(elemento => {
      vetorEntradas.push({ input: [elemento.x, elemento.y, elemento.z, elemento.w], output: [elemento.classe] })
    })

    return vetorEntradas
  }
}


