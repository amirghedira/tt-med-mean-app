import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterInfirmierComponent } from './ajouter-infirmier.component';

describe('AjouterInfirmierComponent', () => {
  let component: AjouterInfirmierComponent;
  let fixture: ComponentFixture<AjouterInfirmierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterInfirmierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
