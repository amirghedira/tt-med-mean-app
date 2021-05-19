import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChercherDossierComponent } from './chercher-dossier.component';

describe('ChercherDossierComponent', () => {
  let component: ChercherDossierComponent;
  let fixture: ComponentFixture<ChercherDossierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChercherDossierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChercherDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
