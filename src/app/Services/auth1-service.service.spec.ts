import { TestBed } from '@angular/core/testing';

import { Auth1ServiceService } from './auth1-service.service';

describe('Auth1ServiceService', () => {
  let service: Auth1ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth1ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
