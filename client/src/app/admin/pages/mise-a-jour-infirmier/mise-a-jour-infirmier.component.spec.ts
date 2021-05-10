import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseAJourInfirmierComponent } from './mise-a-jour-infirmier.component';

describe('MiseAJourInfirmierComponent', () => {
  let component: MiseAJourInfirmierComponent;
  let fixture: ComponentFixture<MiseAJourInfirmierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiseAJourInfirmierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiseAJourInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
