import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePageAssociateComponent } from './role-page-associate.component';

describe('RolePageAssociateComponent', () => {
  let component: RolePageAssociateComponent;
  let fixture: ComponentFixture<RolePageAssociateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolePageAssociateComponent]
    });
    fixture = TestBed.createComponent(RolePageAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
