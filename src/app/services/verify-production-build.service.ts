import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrevIssuedRequest } from '../model/prev-issued-request';
import { VerifyProductionBuildReq } from '../model/verify-production-build';

@Injectable({
  providedIn: 'root'
})
export class VerifyProductionBuildService {

  constructor(private http: HttpClient) {}

  getVerifyProductionBuldRequests(): Observable<VerifyProductionBuildReq[]> {
    var url: string = 'data/verifyProductionBuild.json'; 
    return this.http.get<VerifyProductionBuildReq[]>(url);
  }

  getPrevIssuedRequests(): Observable<PrevIssuedRequest[]> {
    var url: string = 'data/prevIssuedReqs.json'; 
    return this.http.get<PrevIssuedRequest[]>(url);
  }

}
