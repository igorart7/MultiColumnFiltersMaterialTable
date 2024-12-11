import { TestBed } from '@angular/core/testing';

import { ModValServiceService } from './mod-val-service.service';

describe('ModValServiceService', () => {
  let service: ModValServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModValServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
