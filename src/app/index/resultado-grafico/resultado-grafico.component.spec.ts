import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoGraficoComponent } from './resultado-grafico.component';

describe('ResultadoGraficoComponent', () => {
  let component: ResultadoGraficoComponent;
  let fixture: ComponentFixture<ResultadoGraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoGraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
