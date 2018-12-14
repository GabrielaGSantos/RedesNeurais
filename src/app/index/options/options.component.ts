import { Component, OnInit } from '@angular/core';
import { TrainingOptions } from 'src/app/classes/training-options';
import { TrainingService } from '../training.service';

let self: OptionsComponent

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsComponent implements OnInit {

  camadas: number
  neuronios: number
  funcaoAtivacao: string
  taxaAprendizagem: number
  epocas: number  

  constructor(public trainingService: TrainingService) {
    self = this
    this.trainingService.opcoesTreinamentoAnnounce$.subscribe()
  }


  ngOnInit() {
  }

  onChangeFuncao(funcao) {
    self.funcaoAtivacao = funcao
  }

  start() {

    var trainingOptions: TrainingOptions = {
      camadas: this.camadas,
      neuronios: this.neuronios,
      funcaoAtivacao: this.funcaoAtivacao,
      taxaAprendizagem: this.taxaAprendizagem,
      epocas: this.epocas
    }

    if(trainingOptions != undefined)
      self.trainingService.announceopcoesTreinamento(trainingOptions)
    
    else
      console.log('error')

  }

  updateOptions() {

  }
}
