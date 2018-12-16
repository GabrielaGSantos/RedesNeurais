import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { TrainingOptions } from 'src/app/classes/training-options';

let self: ResultadoGraficoComponent

@Component({
  selector: 'app-resultado-grafico',
  templateUrl: './resultado-grafico.component.html',
  styleUrls: ['./resultado-grafico.component.css']
})


export class ResultadoGraficoComponent implements OnInit {  
  
  graph = {
    data: [
        { x: [0], y: [1] , type: 'scatter', mode: 'lines+points', marker: {color: '#F50057'} }
    ],
    layout: {width: 800, height: 400, title: 'Treinamento'}
  }

  constructor(public trainingService: TrainingService) {
    self = this
    this.trainingService.opcoesTreinamentoAnnounce$.subscribe(this.announceopcoesTreinamento)
  }

  ngOnInit() {

    
  }

  announceopcoesTreinamento(trainingOptions: TrainingOptions) {
    //self.opcoesTreinamentoAnnounceSource.next(trainingOptions)
    console.log("ok")

    self.onInputChangeConfig()
  }

  onInputChangeConfig(){

    

  }
}