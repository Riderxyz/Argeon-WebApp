import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagiasComponent } from './magias.component';

describe('MagiasComponent', () => {
  let component: MagiasComponent;
  let fixture: ComponentFixture<MagiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
