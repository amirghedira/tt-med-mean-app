import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAgentComponent } from './ajouter-agent.component';

describe('AjouterAgentComponent', () => {
  let component: AjouterAgentComponent;
  let fixture: ComponentFixture<AjouterAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
