import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesEditComponent } from './employes-edit.component';

describe('EmployesEditComponent', () => {
  let component: EmployesEditComponent;
  let fixture: ComponentFixture<EmployesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
