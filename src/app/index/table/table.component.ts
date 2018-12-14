import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TrainingService } from '../training.service';
import { Elemento } from 'src/app/classes/element';

let self: TableComponent

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns = ['x', 'y', 'z', 'w', 'classe'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  elemento: Elemento[] = ELEMENT_DATA


  constructor(public trainingService: TrainingService) {
    self = this
    this.trainingService.tableAnnounce$.subscribe()
   }

  ngOnInit() {
  }

  // envia os dados da tabela para training.service
  changeElement(){
    self.trainingService.announcetable(self.elemento)
  }
}


const ELEMENT_DATA: Elemento[] = [
  { x: 0, y:0, z:0, w:0, classe: 0},
  { x: 0, y:0, z:0, w:1, classe: 0},
  { x: 0, y:0, z:1, w:0, classe: 1},
  { x: 0, y:0, z:1, w:1, classe: 1},
  { x: 0, y:1, z:0, w:0, classe: 0},
  { x: 0, y:1, z:0, w:1, classe: 0},
  { x: 0, y:1, z:1, w:0, classe: 1},
  { x: 0, y:1, z:1, w:1, classe: 1},
  { x: 1, y:0, z:0, w:0, classe: 1},
  { x: 1, y:0, z:0, w:1, classe: 1},
  { x: 1, y:0, z:1, w:0, classe: 0},
  { x: 1, y:0, z:1, w:1, classe: 0},
  { x: 1, y:1, z:0, w:0, classe: 0},
  { x: 1, y:1, z:0, w:1, classe: 1},
  { x: 1, y:1, z:1, w:0, classe: 1},
  { x: 1, y:1, z:1, w:1, classe: 1}
];

