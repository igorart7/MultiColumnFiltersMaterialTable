import { TestBed } from '@angular/core/testing';

import { LogReportService } from './log-report.service';

describe('LogReportService', () => {
  let service: LogReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
