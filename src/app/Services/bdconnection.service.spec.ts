import { TestBed } from '@angular/core/testing';

import { BDConnectionService } from './bdconnection.service';

describe('BDConnectionService', () => {
  let service: BDConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BDConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
