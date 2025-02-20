import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogReportRequest } from '../model/log-report-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogReportService {

  constructor(private http: HttpClient) { }

    getLogReportRequests(): Observable<LogReportRequest[]> {
      var url: string = 'data/logReport.json'; 
      return this.http.get<LogReportRequest[]>(url);
    }

}
