import { TestBed } from '@angular/core/testing';

import { VerifyProductionBuildService } from './verify-production-build.service';

describe('VerifyProductionBuildService', () => {
  let service: VerifyProductionBuildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyProductionBuildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
