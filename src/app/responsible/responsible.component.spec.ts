import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleComponent } from './responsible.component';

describe('ResponsibleComponent', () => {
  let component: ResponsibleComponent;
  let fixture: ComponentFixture<ResponsibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsibleComponent]
    });
    fixture = TestBed.createComponent(ResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
