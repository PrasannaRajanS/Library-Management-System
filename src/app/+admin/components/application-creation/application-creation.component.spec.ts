import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCreationComponent } from './application-creation.component';

describe('ApplicationCreationComponent', () => {
  let component: ApplicationCreationComponent;
  let fixture: ComponentFixture<ApplicationCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationCreationComponent]
    });
    fixture = TestBed.createComponent(ApplicationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
