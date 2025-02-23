import { TestBed } from '@angular/core/testing';

import { ReverseAuthService } from './reverse-auth.service';

describe('ReverseAuthService', () => {
  let service: ReverseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReverseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
