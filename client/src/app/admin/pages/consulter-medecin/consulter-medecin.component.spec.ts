import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterMedecinComponent } from './consulter-medecin.component';

describe('ConsulterMedecinComponent', () => {
  let component: ConsulterMedecinComponent;
  let fixture: ComponentFixture<ConsulterMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
