import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiseAJourAgentComponent } from './mise-a-jour-agent.component';

describe('MiseAJourAgentComponent', () => {
  let component: MiseAJourAgentComponent;
  let fixture: ComponentFixture<MiseAJourAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiseAJourAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiseAJourAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
