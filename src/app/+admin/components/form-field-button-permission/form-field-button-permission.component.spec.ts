import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldButtonPermissionComponent } from './form-field-button-permission.component';

describe('FormFieldButtonPermissionComponent', () => {
  let component: FormFieldButtonPermissionComponent;
  let fixture: ComponentFixture<FormFieldButtonPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldButtonPermissionComponent]
    });
    fixture = TestBed.createComponent(FormFieldButtonPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
