import { TestBed } from '@angular/core/testing';

import { PromoteToProductionService } from './promote-to-production.service';

describe('PromoteToProductionService', () => {
  let service: PromoteToProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoteToProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
