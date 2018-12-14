import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeneuralTabelaComponent } from './redeneural-tabela.component';

describe('RedeneuralTabelaComponent', () => {
  let component: RedeneuralTabelaComponent;
  let fixture: ComponentFixture<RedeneuralTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeneuralTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeneuralTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
