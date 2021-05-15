import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarquerPresenceComponent } from './marquer-presence.component';

describe('MarquerPresenceComponent', () => {
  let component: MarquerPresenceComponent;
  let fixture: ComponentFixture<MarquerPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarquerPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarquerPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
