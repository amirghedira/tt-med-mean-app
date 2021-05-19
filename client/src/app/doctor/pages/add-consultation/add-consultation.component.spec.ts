import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultationComponent } from './add-consultation.component';

describe('AddConsultationComponent', () => {
  let component: AddConsultationComponent;
  let fixture: ComponentFixture<AddConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
