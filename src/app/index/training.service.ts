import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TrainingOptions } from '../classes/training-options';
import { Elemento } from '../classes/element';

let self: TrainingService

@Injectable({
  providedIn: 'root'
})


export class TrainingService {

  camadas: number
  neuronios: number
  funcaoAtivacao: string
  taxaAprendizagem: number
  epocas: number

  private opcoesTreinamentoAnnounceSource = new Subject<TrainingOptions>()
  opcoesTreinamentoAnnounce$ = this.opcoesTreinamentoAnnounceSource.asObservable()

  private tableAnnounceSource = new Subject<Elemento[]>()
  tableAnnounce$ = this.tableAnnounceSource.asObservable()

  constructor() {
    self = this
  }

  announceopcoesTreinamento(trainingOptions: TrainingOptions) {
    self.opcoesTreinamentoAnnounceSource.next(trainingOptions)

    self.camadas = trainingOptions.camadas
    self.neuronios = trainingOptions.neuronios
    self.funcaoAtivacao = trainingOptions.funcaoAtivacao
    self.taxaAprendizagem = trainingOptions.taxaAprendizagem
    self.epocas = trainingOptions.epocas
  }

  // recebe os valores da tabela verdade do arquivo table em formato ELEMENTO
  announcetable(elemento: Elemento[]){
    

  }

  iniciarAlgoritmo() {

  }

}

