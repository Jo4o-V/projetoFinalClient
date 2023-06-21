import { TestBed } from '@angular/core/testing';

import { AplicationRepositoryService } from './application-repository.service';

describe('AplicationRepositoryService', () => {
  let service: AplicationRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicationRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
