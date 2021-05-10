import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMedecinComponent } from './ajouter-medecin.component';

describe('AjouterMedecinComponent', () => {
  let component: AjouterMedecinComponent;
  let fixture: ComponentFixture<AjouterMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
