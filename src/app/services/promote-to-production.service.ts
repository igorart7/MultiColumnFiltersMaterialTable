import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrevIssuedRequest } from '../model/prev-issued-request';
import { PromoteToProductionReq } from '../model/promote-to-production-req';

@Injectable({
  providedIn: 'root',
})
export class PromoteToProductionService {

  constructor(private http: HttpClient) { }

  getPromoteToProdRequests(): Observable<PromoteToProductionReq[]> {
    var url: string = 'data/promoteToProduction.json'; 
    return this.http.get<PromoteToProductionReq[]>(url);
  }

  getPrevIssuedRequests(): Observable<PrevIssuedRequest[]> {
    var url: string = 'data/prevIssuedReqs.json'; 
    return this.http.get<PrevIssuedRequest[]>(url);
  }

}
