import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscDetailComponent } from './misc-detail.component';

describe('MiscDetailComponent', () => {
  let component: MiscDetailComponent;
  let fixture: ComponentFixture<MiscDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiscDetailComponent]
    });
    fixture = TestBed.createComponent(MiscDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
