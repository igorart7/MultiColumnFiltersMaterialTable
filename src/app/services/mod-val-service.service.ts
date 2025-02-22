import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModValRequest } from '../model/mod-val-request';
import { PrevIssuedRequest } from '../model/prev-issued-request';

@Injectable({
  providedIn: 'root',
})
export class ModValServiceService {

  constructor(private http: HttpClient) { }

  getModValRequests(successParam: string): Observable<ModValRequest[]> {
    var url: string = 'data/modValSuccess.json';
    if (successParam == 'failed') {
      url = 'data/modValFailed.json';
    };
  
    return this.http.get<ModValRequest[]>(url);
  }

  getPrevIssuedRequests(): Observable<PrevIssuedRequest[]> {
    var url: string = 'data/prevIssuedReqs.json'; 
    return this.http.get<PrevIssuedRequest[]>(url);
  }
}
