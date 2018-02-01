import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFichasComponent } from './editar-fichas.component';

describe('EditarFichasComponent', () => {
  let component: EditarFichasComponent;
  let fixture: ComponentFixture<EditarFichasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarFichasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
