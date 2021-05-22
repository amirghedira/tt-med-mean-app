import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterConsultationComponent } from './ajouter-consultation.component';

describe('AjouterConsultationComponent', () => {
  let component: AjouterConsultationComponent;
  let fixture: ComponentFixture<AjouterConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
