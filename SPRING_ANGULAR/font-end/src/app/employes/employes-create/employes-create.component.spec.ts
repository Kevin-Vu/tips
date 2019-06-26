import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesCreateComponent } from './employes-create.component';

describe('EmployesCreateComponent', () => {
  let component: EmployesCreateComponent;
  let fixture: ComponentFixture<EmployesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
