import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseAJourMedecinComponent } from './mise-a-jour-medecin.component';

describe('MiseAJourMedecinComponent', () => {
  let component: MiseAJourMedecinComponent;
  let fixture: ComponentFixture<MiseAJourMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiseAJourMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiseAJourMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
