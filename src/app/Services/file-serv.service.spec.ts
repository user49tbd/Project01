import { TestBed } from '@angular/core/testing';

import { FileServService } from './file-serv.service';

describe('FileServService', () => {
  let service: FileServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
