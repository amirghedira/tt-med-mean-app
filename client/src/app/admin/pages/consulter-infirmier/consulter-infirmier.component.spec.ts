import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterInfirmierComponent } from './consulter-infirmier.component';

describe('ConsulterInfirmierComponent', () => {
  let component: ConsulterInfirmierComponent;
  let fixture: ComponentFixture<ConsulterInfirmierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterInfirmierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterInfirmierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
