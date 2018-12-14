import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MnistMenuComponent } from './mnist-menu.component';

describe('MnistMenuComponent', () => {
  let component: MnistMenuComponent;
  let fixture: ComponentFixture<MnistMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MnistMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
