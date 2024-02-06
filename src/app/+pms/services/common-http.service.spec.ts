import { TestBed } from '@angular/core/testing';

import { PMSHttpService } from './pms-http.service';

describe('CommonHttpService', () => {
  let service: PMSHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PMSHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
