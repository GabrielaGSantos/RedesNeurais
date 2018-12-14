import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnistOptionsComponent } from './mnist-options.component';

describe('MnistOptionsComponent', () => {
  let component: MnistOptionsComponent;
  let fixture: ComponentFixture<MnistOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnistOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnistOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
