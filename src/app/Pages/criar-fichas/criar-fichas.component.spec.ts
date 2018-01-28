import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarFichasComponent } from './criar-fichas.component';

describe('CriarFichasComponent', () => {
  let component: CriarFichasComponent;
  let fixture: ComponentFixture<CriarFichasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarFichasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
