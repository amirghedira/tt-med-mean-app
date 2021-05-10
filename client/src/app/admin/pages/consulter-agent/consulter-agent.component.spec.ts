import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterAgentComponent } from './consulter-agent.component';

describe('ConsulterAgentComponent', () => {
  let component: ConsulterAgentComponent;
  let fixture: ComponentFixture<ConsulterAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
