import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModValRequest } from '../model/mod-val-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModValServiceService {

  constructor(private http: HttpClient) { }

  getModValRequestData(successParam: string): Observable<ModValRequest[]> {
    var url: string = 'data/modValSuccess.json';
    if (successParam == 'failed') {
      url = 'data/modValFailed.json';
    };
  
    return this.http.get<ModValRequest[]>(url);
  }

}
